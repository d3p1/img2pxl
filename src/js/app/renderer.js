/**
 * @description Renderer
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import * as THREE from 'three'

export default class Renderer {
  /**
   * @type {THREE.WebGLRenderer}
   */
  #self

  /**
   * @type {THREE.Scene}
   */
  #scene

  /**
   * @type {THREE.OrthographicCamera}
   * @note It is used an orthographic camera because it is desired
   *       to draw a 2d image without a perspective
   */
  #camera

  /**
   * @type {Function}
   */
  #boundResizeRenderer

  /**
   * Constructor
   */
  constructor() {
    this.#initScene()
    this.#initCamera()
    this.#initRenderer()
  }

  /**
   * Render
   *
   * @returns {void}
   */
  render() {
    this.#self.render(this.#scene, this.#camera)
  }

  /**
   * Add mesh to render
   *
   * @param   {THREE.Mesh} mesh
   * @returns {void}
   */
  add(mesh) {
    this.#scene.add(mesh)
  }

  /**
   * Dispose
   *
   * @returns {void}
   */
  dispose() {
    this.#scene.traverse((child) => {
      if (child.isMesh) {
        this.#disposeMesh(child)
      }
    })

    this.#disposeScene()

    this.#disposeRenderer()
  }

  /**
   * Dispose child
   *
   * @param   {THREE.Mesh} mesh
   * @returns {void}
   */
  #disposeMesh(mesh) {
    mesh.geometry?.dispose()

    if (mesh.material) {
      for (const key in mesh.material) {
        const mat = mesh.material[key]
        if (mat && mat.dispose === 'function') {
          mat.dispose()
        }
      }
      mesh.material?.dispose()
    }
  }

  /**
   * Dispose scene
   *
   * @returns {void}
   */
  #disposeScene() {
    while (this.#scene.children.length > 0) {
      this.#scene.remove(this.#scene.children[0])
    }
  }

  /**
   * Dispose renderer
   *
   * @returns {void}
   */
  #disposeRenderer() {
    this.#self.dispose()
    window.removeEventListener('resize', this.#boundResizeRenderer)
  }

  /**
   * Init scene
   *
   * @returns {void}
   */
  #initScene() {
    this.#scene = new THREE.Scene()
  }

  /**
   * Init camera
   *
   * @returns {void}
   */
  #initCamera() {
    const far = 1
    this.#camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, far)
    this.#scene.add(this.#camera)

    this.#camera.position.z = far
  }

  /**
   * Init renderer
   *
   * @returns {void}
   */
  #initRenderer() {
    const canvas = document.createElement('canvas')
    document.body.append(canvas)

    const pr = window.devicePixelRatio
    let antialias = true
    if (pr <= 1) {
      antialias = false
    }
    this.#self = new THREE.WebGLRenderer({canvas: canvas, antialias: antialias})
    this.#self.setPixelRatio(Math.min(pr, 2))

    this.#resizeRenderer()
    this.#boundResizeRenderer = this.#resizeRenderer.bind(this)
    window.addEventListener('resize', this.#boundResizeRenderer)
  }

  /**
   * Resize renderer
   *
   * @returns {void}
   */
  #resizeRenderer() {
    this.#self.setSize(window.innerWidth, window.innerHeight)
  }
}