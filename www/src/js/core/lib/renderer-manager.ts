/**
 * @description Renderer manager
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 * @note        The idea behind this class is to encapsulate and wrap the
 *              render logic
 */
import * as THREE from 'three'

export default class RendererManager {
  /**
   * @type {THREE.Scene}
   */
  scene: THREE.Scene

  /**
   * @type {THREE.WebGLRenderer}
   */
  renderer: THREE.WebGLRenderer

  /**
   * @type {THREE.OrthographicCamera}
   * @note It is used an orthographic camera because it is desired
   *       to draw a 2d image without perspective
   */
  camera: THREE.OrthographicCamera

  /**
   * @type {number}
   */
  width: number

  /**
   * @type {number}
   */
  height: number

  /**
   * @type {number}
   * @note Device pixel ratio
   */
  dpr: number

  /**
   * Constructor
   *
   * @param {number} width
   * @param {number} height
   */
  constructor(width: number, height: number) {
    this.width = width
    this.height = height
    this.#initRenderer()
    this.#initScene()
    this.#initCamera()
  }

  /**
   * Update
   *
   * @returns {void}
   */
  update(): void {
    this.renderer.render(this.scene, this.camera)
  }

  /**
   * Dispose
   *
   * @returns {void}
   */
  dispose(): void {
    this.#disposeScene()
    this.#disposeRenderer()
  }

  /**
   * Init renderer
   *
   * @returns {void}
   * @note    The antialias is only enabled for devices with less than `2`
   *          as a pixel ratio. This is done to improve performance because
   *          this type of device does not require this feature
   */
  #initRenderer(): void {
    const canvas = document.createElement('canvas')
    document.body.append(canvas)

    this.dpr = Math.min(window.devicePixelRatio, 2)

    let antialias = false
    if (this.dpr <= 1) {
      antialias = true
    }
    this.renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: antialias,
    })
    this.renderer.setPixelRatio(this.dpr)
    this.renderer.setSize(this.width, this.height)
  }

  /**
   * Init camera
   *
   * @returns {void}
   * @note    The renderer will have the same dimensions as the image.
   *          The idea is that a plane with the image as texture will be
   *          used inside the renderer, and this plane also will have the
   *          image dimensions.
   *          An orthographic camera will be positioned to show exactly
   *          that plane.
   *          Because it is used an orthographic camera,
   *          `1` world unit is `1` pixel, making it easy to position things
   * @link    https://discourse.threejs.org/t/mapping-orthographiccamera-world-units-to-pixels/10142
   */
  #initCamera(): void {
    const left = -this.renderer.domElement.width / 2
    const right = this.renderer.domElement.width / 2
    const top = this.renderer.domElement.height / 2
    const bottom = -this.renderer.domElement.height / 2
    const near = 0.1
    const far = 1
    this.camera = new THREE.OrthographicCamera(
      left,
      right,
      top,
      bottom,
      near,
      far,
    )
    this.scene.add(this.camera)

    this.camera.position.z = far - 0.1
  }

  /**
   * Init scene
   *
   * @returns {void}
   */
  #initScene(): void {
    this.scene = new THREE.Scene()
  }

  /**
   * Dispose renderer
   *
   * @returns {void}
   */
  #disposeRenderer(): void {
    this.renderer.dispose()
  }

  /**
   * Dispose scene
   *
   * @returns {void}
   */
  #disposeScene(): void {
    while (this.scene.children.length > 0) {
      this.scene.remove(this.scene.children[0])
    }
  }
}
