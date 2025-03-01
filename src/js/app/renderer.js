/**
 * @description Renderer
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import * as THREE from 'three'

export default class Renderer {
  /**
   * @type {THREE.Mesh}
   */
  #image

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
   * Constructor
   *
   * @param {string} src
   * @param {number} width
   * @param {number} height
   * @param {number} pixelCount
   */
  constructor(src, width, height, pixelCount) {
    this.#initScene()
    this.#initCamera()
    this.#initImageMesh(src, pixelCount)
    this.#initRenderer(width, height)
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
   * Init image mesh
   *
   * @param   {string} src
   * @param   {number} pixelCount
   * @returns {void}
   * @note    The total image size that will be shown will go from
   *          camera left position to camera right position for the width,
   *          and from camera bottom position to camera top position for the
   *          height.
   *          It is used an image factor to give a little margin to the image
   * @todo    Improve how texture loader is created.
   *          Add loader manager to handle loading time
   */
  #initImageMesh(src, pixelCount) {
    const textureLoader = new THREE.TextureLoader()
    const texture = textureLoader.load(src)

    const imageFactor = 0.8
    const imageWidth = (-this.#camera.left + this.#camera.right) * imageFactor
    const imageHeight = (-this.#camera.bottom + this.#camera.top) * imageFactor
    const imageGeometry = new THREE.PlaneGeometry(
      imageWidth,
      imageHeight,
      pixelCount,
      pixelCount,
    )
    const imageMaterial = new THREE.MeshBasicMaterial({map: texture})
    this.#image = new THREE.Mesh(imageGeometry, imageMaterial)
    this.#scene.add(this.#image)
  }

  /**
   * Init renderer
   *
   * @param   {number} width
   * @param   {number} height
   * @returns {void}
   */
  #initRenderer(width, height) {
    const canvas = document.createElement('canvas')
    document.body.append(canvas)

    const pr = window.devicePixelRatio
    let antialias = true
    if (pr <= 1) {
      antialias = false
    }
    this.#self = new THREE.WebGLRenderer({canvas: canvas, antialias: antialias})
    this.#self.setPixelRatio(Math.min(pr, 2))
    this.#self.setSize(width, height)
  }
}
