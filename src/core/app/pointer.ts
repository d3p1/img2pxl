/**
 * @description Pointer
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import * as THREE from 'three'
import RendererManager from '../lib/renderer-manager.js'
import Canvas from './pointer/canvas.js'

export default class Pointer {
  /**
   * @type {THREE.Vector2 | {x: number | undefined, y: number | undefined}}
   */
  coord: THREE.Vector2 | {x: number | undefined; y: number | undefined}

  /**
   * @type {Canvas}
   */
  canvas: Canvas

  /**
   * @type {THREE.Raycaster}
   */
  raycaster: THREE.Raycaster

  /**
   * @type {THREE.Mesh}
   */
  raycasterPlane: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>

  /**
   * @type {RendererManager}
   */
  #rendererManager: RendererManager

  /**
   * @type {Function}
   */
  #boundPointerMove: (e: PointerEvent) => void

  /**
   * @type {Function}
   */
  #boundPointerLeave: (e: PointerEvent) => void

  /**
   * Constructor
   *
   * @param {RendererManager} rendererManager
   * @param {Canvas}          canvas
   */
  constructor(rendererManager: RendererManager, canvas: Canvas) {
    this.canvas = canvas
    this.coord = new THREE.Vector2(undefined, undefined)
    this.#rendererManager = rendererManager
    this.#initRaycaster()
  }

  /**
   * Update
   *
   * @returns {void}
   */
  update(): void {
    let dx: number | null = null
    let dy: number | null = null

    if (this.coord.x && this.coord.y) {
      this.raycaster.setFromCamera(
        this.coord as THREE.Vector2,
        this.#rendererManager.camera,
      )
      const intersections = this.raycaster.intersectObject(this.raycasterPlane)
      if (intersections.length) {
        const uv = intersections[0].uv as THREE.Vector2
        dx = uv.x * this.canvas.element.width
        dy = (1 - uv.y) * this.canvas.element.height
      }
    }

    this.canvas.update(dx, dy)
  }

  /**
   * Enable debug mode
   *
   * @returns {void}
   */
  debug(): void {
    this.canvas.debug()
  }

  /**
   * Dispose
   *
   * @returns {void}
   */
  dispose(): void {
    this.canvas.dispose()
    this.#disposeRaycaster()
  }

  /**
   * Process pointer move
   *
   * @param   {PointerEvent} e
   * @returns {void}
   * @note    Pointer coordinates are normalized to
   *          clip space (NDC - Normalized Device Coordinate) to
   *          use it for raycasting
   */
  #processPointerMove(e: PointerEvent): void {
    const target = e.target as EventTarget & {width: number; height: number}
    this.coord.x = (e.offsetX / target.width - 0.5) * 2
    this.coord.y = -(e.offsetY / target.height - 0.5) * 2
  }

  /**
   * Process pointer leave
   *
   * @returns {void}
   */
  #processPointerLeave(): void {
    this.coord.x = undefined
    this.coord.y = undefined
  }

  /**
   * Init raycaster
   *
   * @returns {void}
   * @note    It is created low poly plane in front of the image
   *          to avoid performance issues that could arise while
   *          working between the raycaster and image points
   */
  #initRaycaster(): void {
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
  #disposeRaycaster(): void {
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
