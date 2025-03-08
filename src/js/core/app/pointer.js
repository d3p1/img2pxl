/**
 * @description Pointer
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import * as THREE from 'three'
import RendererManager from '../lib/renderer-manager.js'
import Canvas from './pointer/canvas.js'

export default class Pointer {
  /**
   * @type {THREE.Vector2}
   */
  coord

  /**
   * @type {Canvas}
   */
  canvas

  /**
   * @type {THREE.Raycaster}
   */
  raycaster

  /**
   * @type {THREE.Mesh}
   */
  raycasterPlane

  /**
   * @type {RendererManager}
   */
  #rendererManager

  /**
   * @type {Function}
   */
  #boundPointerMove

  /**
   * @type {Function}
   */
  #boundPointerLeave

  /**
   * Constructor
   *
   * @param {RendererManager} rendererManager
   * @param {Canvas}          canvas
   */
  constructor(rendererManager, canvas) {
    this.canvas = canvas
    this.coord = new THREE.Vector2(null, null)
    this.#rendererManager = rendererManager
    this.#initRaycaster()
  }

  /**
   * Update
   *
   * @returns {void}
   */
  update() {
    let dx = null
    let dy = null

    if (this.coord.x && this.coord.y) {
      this.raycaster.setFromCamera(this.coord, this.#rendererManager.camera)
      const intersections = this.raycaster.intersectObject(this.raycasterPlane)
      if (intersections.length) {
        dx = intersections[0].uv.x * this.canvas.element.width
        dy = (1 - intersections[0].uv.y) * this.canvas.element.height
      }
    }

    this.canvas.update(dx, dy)
  }

  /**
   * Dispose
   *
   * @returns {void}
   */
  dispose() {
    this.canvas.dispose()
    this.#disposeRaycaster()
  }

  /**
   * Process pointer move
   *
   * @param   {PointerEvent} event
   * @returns {void}
   * @note    Pointer coordinates are normalized to
   *          clip space (NDC - Normalized Device Coordinate) to
   *          use it for raycasting
   */
  #processPointerMove(event) {
    this.coord.x = (event.offsetX / event.target.width - 0.5) * 2
    this.coord.y = -(event.offsetY / event.target.height - 0.5) * 2
  }

  /**
   * Process pointer leave
   *
   * @returns {void}
   */
  #processPointerLeave() {
    this.coord.x = null
    this.coord.y = null
  }

  /**
   * Init raycaster
   *
   * @returns {void}
   * @note    It is created low poly plane in front of the image
   *          to avoid performance issues that could arise while
   *          working between the raycaster and image points
   */
  #initRaycaster() {
    this.raycaster = new THREE.Raycaster()

    this.#boundPointerMove = this.#processPointerMove.bind(this)
    this.#rendererManager.renderer.domElement.addEventListener(
      'pointermove',
      this.#boundPointerMove,
    )

    this.#boundPointerLeave = this.#processPointerLeave.bind(this)
    this.#rendererManager.renderer.domElement.addEventListener(
      'pointerleave',
      this.#boundPointerLeave,
    )

    this.raycasterPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(
        this.#rendererManager.width,
        this.#rendererManager.height,
      ),
      new THREE.MeshBasicMaterial(),
    )
    this.raycasterPlane.visible = false
  }

  /**
   * Dispose raycaster
   *
   * @returns {void}
   */
  #disposeRaycaster() {
    this.#rendererManager.renderer.domElement.removeEventListener(
      'pointermove',
      this.#boundPointerMove,
    )
    this.#rendererManager.renderer.domElement.removeEventListener(
      'pointerleave',
      this.#boundPointerLeave,
    )

    this.raycasterPlane.geometry.dispose()
    this.raycasterPlane.material.dispose()
  }
}
