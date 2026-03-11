/**
 * @description Pointer canvas
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 * @note        This canvas will be used as a texture that will be sent
 *              to the vertex shader. This texture will be updated
 *              to mark where the pointer is in relation with the image.
 *              In that way, it allows selecting which vertices/points/pixels
 *              should be displaced
 */
import * as THREE from 'three'
import DebugManager from '../../../../services/debug-manager.js'
import {CANVAS_TEXTURE_RESOLUTION} from '../../../../etc/config.ts'

export default class Canvas {
  /**
   * @type {THREE.CanvasTexture}
   */
  texture: THREE.Texture

  /**
   * @type {HTMLCanvasElement}
   */
  element: HTMLCanvasElement

  /**
   * @type {DebugManager}
   */
  #debugManager: DebugManager

  /**
   * @type {CanvasRenderingContext2D}
   */
  #context: CanvasRenderingContext2D

  /**
   * @type {HTMLImageElement}
   * @note Image that will represent the pointer.
   *       This image is used to
   *       select which vertices/points/pixels
   *       should be displaced
   */
  #pointerImage: HTMLImageElement

  /**
   * @type {number}
   * @note This value defines how many pixels are affected by the
   *       pointer effect.
   *       It is defined as a proportion of the image resolution width
   */
  #pointerImageSize: number

  /**
   * @type {number}
   * @note This value defines the strength of the
   *       pointer trailing effect on the
   *       pixels' displacement
   */
  #pointerTrailingFactor: number

  /**
   * Constructor
   *
   * @param {DebugManager} debugManager
   * @param {string}       pointerImageSrc
   * @param {number}       pointerImageSize
   * @param {number}       pointerTrailingFactor
   */
  constructor(
    debugManager: DebugManager,
    pointerImageSrc: string,
    pointerImageSize: number = 0.1,
    pointerTrailingFactor: number = 0.05,
  ) {
    this.#debugManager = debugManager
    this.#pointerTrailingFactor = pointerTrailingFactor
    this.#initCanvasTexture()
    this.#initPointerImage(pointerImageSrc, pointerImageSize)
  }

  /**
   * Update
   *
   * @param   {number | null} dx
   * @param   {number | null} dy
   * @returns {void}
   */
  update(dx: number | null, dy: number | null): void {
    this.#clear()

    if (dx && dy) {
      this.#draw(dx, dy)
    }

    this.texture.needsUpdate = true
  }

  /**
   * Enable debug mode
   *
   * @returns {void}
   */
  debug(): void {
    const pointerFolder = this.#debugManager.addFolder({
      title: 'Pointer',
    })

    this.#debugManager
      .addBinding(
        'size',
        this.#pointerImageSize / this.element.width,
        {
          min: 0,
          max: 1,
          step: 0.01,
        },
        pointerFolder,
      )
      .on('change', (e) => this.#processPointerImageSize(e.value))

    this.#debugManager
      .addBinding(
        'trailing',
        this.#pointerTrailingFactor,
        {
          min: 0,
          max: 1,
          step: 0.01,
        },
        pointerFolder,
      )
      .on('change', (e) => (this.#pointerTrailingFactor = e.value))

    const pointerCanvasFolder = this.#debugManager.addFolder({
      title: 'Pointer Canvas',
    })

    this.#debugManager
      .addBinding('show', false, undefined, pointerCanvasFolder)
      .on('change', (e) => {
        if (e.value) {
          document.body.appendChild(this.element)
          this.element.style.position = 'fixed'
          this.element.style.top = '0'
          this.element.style.left = '0'
          this.element.style.border = '1px solid #fff'
        } else {
          document.body.removeChild(this.element)
        }
      })
  }

  /**
   * Dispose
   *
   * @returns {void}
   */
  dispose(): void {
    this.texture.dispose()
  }

  /**
   * Draw
   *
   * @param   {number} dx
   * @param   {number} dy
   * @returns {void}
   * @note    The destination of the image is moved half its size
   *          so it is drawn at the center of the destination position
   */
  #draw(dx: number, dy: number): void {
    dx -= this.#pointerImageSize / 2
    dy -= this.#pointerImageSize / 2

    this.#context.save()
    this.#context.globalCompositeOperation = 'lighten'
    this.#context.drawImage(
      this.#pointerImage,
      dx,
      dy,
      this.#pointerImageSize,
      this.#pointerImageSize,
    )
    this.#context.restore()
  }

  /**
   * Clear
   *
   * @returns {void}
   * @note    The idea is to draw a white image that will
   *          indicate how much points inside them will be displaced.
   *          That is why it is required to clear the canvas with black color
   */
  #clear(): void {
    this.#context.save()
    this.#context.globalAlpha = this.#pointerTrailingFactor
    this.#context.fillStyle = '#000'
    this.#context.fillRect(0, 0, this.element.width, this.element.height)
    this.#context.restore()
  }

  /**
   * Init canvas texture used to detect pointer location and
   * displace points
   *
   * @returns {void}
   * @note    This canvas will work as a texture, but it is not necessary
   *          to use 1 to 1 map between renderer/image pixels and
   *          it.
   *          It is considered that a low-resolution texture
   *          improves performance without affecting the final effect
   */
  #initCanvasTexture(): void {
    this.element = document.createElement('canvas')
    this.element.style.width = `${CANVAS_TEXTURE_RESOLUTION}px`
    this.element.style.height = `${CANVAS_TEXTURE_RESOLUTION}px`
    this.element.width = CANVAS_TEXTURE_RESOLUTION
    this.element.height = CANVAS_TEXTURE_RESOLUTION
    this.texture = new THREE.CanvasTexture(this.element)

    this.#context = this.element.getContext('2d') as CanvasRenderingContext2D
  }

  /**
   * Init pointer image
   *
   * @param   {string} pointerImageSrc
   * @param   {number} pointerImageSize
   * @returns {void}
   * @note    It is considered that the pointer image will be
   *          a white image that will indicate which pixels should be displaced
   */
  #initPointerImage(pointerImageSrc: string, pointerImageSize: number): void {
    this.#pointerImage = new Image()
    this.#pointerImage.src = pointerImageSrc
    this.#processPointerImageSize(pointerImageSize)
  }

  /**
   * Process pointer image size
   *
   * @param   {number} pointerImageSize
   * @returns {void}
   * @note    The aspect ratio of the image is always square
   *          (the same size is used for the width and the height of the image).
   *          It is proportional to the canvas width.
   *          This approach is considered correct because web elements
   *          adjust only their width to fit in the page
   */
  #processPointerImageSize(pointerImageSize: number): void {
    this.#pointerImageSize = pointerImageSize * this.element.width
  }
}
