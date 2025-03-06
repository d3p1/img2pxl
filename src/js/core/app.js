/**
 * @description App
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import * as THREE from 'three'
import RendererManager from './renderer-manager.js'
import Image from './app/image.js'

export default class App {
  /**
   * @type {THREE.Mesh}
   */
  #raycasterPlane

  /**
   * @type {THREE.Raycaster}
   */
  #raycaster

  /**
   * @type {THREE.Vector2}
   */
  #pointer

  /**
   * @type {RendererManager}
   */
  #rendererManager

  /**
   * @type {Image}
   */
  #image

  /**
   * @type {Function}
   */
  #boundPointerMove

  /**
   * Constructor
   *
   * @param {RendererManager} rendererManager
   * @param {Image}           image
   */
  constructor(rendererManager, image) {
    this.#rendererManager = rendererManager
    this.#initImage(image)
    this.#initRaycaster()
  }

  /**
   * Update
   *
   * @param   {number} elapsed
   * @param   {number} delta
   * @returns {void}
   */
  update(elapsed, delta) {
    this.#image.update(this.#processRaycaster(), elapsed, delta)
    this.#rendererManager.update()
  }

  /**
   * Dispose
   *
   * @returns {void}
   */
  dispose() {
    this.#disposeRaycasterPlane()
    this.#image.dispose()
    this.#disposeRendererManager()
  }

  /**
   * Process raycaster
   *
   * @returns {number[]|null}
   */
  #processRaycaster() {
    if (this.#pointer.x && this.#pointer.y) {
      this.#raycaster.setFromCamera(this.#pointer, this.#rendererManager.camera)
      const intersections = this.#raycaster.intersectObject(
        this.#raycasterPlane,
      )
      if (intersections.length) {
        return [intersections[0].uv.x, intersections[0].uv.y]
      }
    }
    return null
  }

  /**
   * Process pointer
   *
   * @param   {PointerEvent} event
   * @returns {void}
   * @note    Pointer coordinates are normalized to clip space to
   *          be able to use it for raycasting
   */
  #processPointer(event) {
    this.#pointer.x =
      (event.offsetX / this.#rendererManager.renderer.domElement.width - 0.5) *
      2
    this.#pointer.y =
      -(
        event.offsetY / this.#rendererManager.renderer.domElement.height -
        0.5
      ) * 2
  }

  /**
   * Init raycaster
   *
   * @returns {void}
   * @note    It will be used a low poly plane in front of the image
   *          to avoid performance issues that could arise while
   *          working between the raycaster and image points
   */
  #initRaycaster() {
    this.#raycaster = new THREE.Raycaster()
    this.#pointer = new THREE.Vector2(null, null)

    this.#boundPointerMove = this.#processPointer.bind(this)
    this.#rendererManager.renderer.domElement.addEventListener(
      'pointermove',
      this.#boundPointerMove,
    )

    this.#rendererManager.renderer.domElement.addEventListener(
      'pointerleave',
      () => {
        this.#pointer.x = null
        this.#pointer.y = null
      },
    )

    this.#raycasterPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(),
      new THREE.MeshBasicMaterial(),
    )
    this.#raycasterPlane.scale.set(
      this.#image.points.geometry.parameters.width,
      this.#image.points.geometry.parameters.height,
    )
    this.#raycasterPlane.position.copy(this.#image.points.position)
    this.#raycasterPlane.position.z += 0.01
    this.#raycasterPlane.visible = false
    this.#rendererManager.scene.add(this.#raycasterPlane)
  }

  /**
   * Init image
   *
   * @param   {Image} image
   * @returns {void}
   */
  #initImage(image) {
    this.#image = image
    this.#rendererManager.scene.add(this.#image.points)
  }

  /**
   * Dispose raycaster plane
   *
   * @returns {void}
   */
  #disposeRaycasterPlane() {
    this.#raycasterPlane.geometry.dispose()
    this.#raycasterPlane.material.dispose()
  }

  /**
   * Dispose renderer manager
   *
   * @returns {void}
   */
  #disposeRendererManager() {
    this.#rendererManager.dispose()
    this.#rendererManager.renderer.domElement.removeEventListener(
      'pointermove',
      this.#boundPointerMove,
    )
  }
}
