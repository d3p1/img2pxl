/**
 * @description Pointer canvas
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 * @note        This canvas will be used as a texture that will be sent
 *              to the vertex shader. This texture will be updated
 *              to mark where the pointer is in relation with the image.
 *              It that way, it allows to select which vertices/points/pixels
 *              should be displaced
 */
import {Pane} from 'tweakpane'
import * as THREE from 'three'

export default class Canvas {
  /**
   * @type {Pane}
   */
  #debugManager: Pane

  /**
   * @type {THREE.CanvasTexture}
   */
  texture: THREE.Texture

  /**
   * @type {HTMLCanvasElement}
   */
  element: HTMLCanvasElement

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
  readonly #pointerTrailingFactor: number

  /**
   * Constructor
   *
   * @param {Pane}   debugManager
   * @param {number} resolutionWidth
   * @param {number} resolutionHeight
   * @param {string} pointerImageSrc
   * @param {number} pointerImageSize
   * @param {number} pointerTrailingFactor
   */
  constructor(
    debugManager: Pane,
    resolutionWidth: number,
    resolutionHeight: number,
    pointerImageSrc: string,
    pointerImageSize: number = 0.1,
    pointerTrailingFactor: number = 0.05,
  ) {
    this.#debugManager = debugManager
    this.#pointerTrailingFactor = pointerTrailingFactor
    this.#initCanvasTexture(resolutionWidth, resolutionHeight)
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
    const pointerMotionFolder = this.#debugManager.addFolder({
      title: 'Pointer Motion',
    })

    pointerMotionFolder
      .addBinding({size: this.#pointerImageSize / this.element.width}, 'size', {
        min: 0,
        max: 1,
        step: 0.01,
      })
      .on('change', (e) => this.#processPointerImageSize(e.value))

    pointerMotionFolder.addBinding(
      {trailing: this.#pointerTrailingFactor},
      'trailing',
      {
        min: 0,
        max: 1,
        step: 0.01,
      },
    )

    const pointerCanvasFolder = this.#debugManager.addFolder({
      title: 'Pointer Canvas',
    })

    pointerCanvasFolder.addBinding({show: false}, 'show').on('change', (e) => {
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
   * @param   {number} resolutionWidth
   * @param   {number} resolutionHeight
   * @returns {void}
   * @note    The canvas will have the same number of pixels as the
   *          image.
   *          That is why it is used the image resolution as its dimensions
   */
  #initCanvasTexture(resolutionWidth: number, resolutionHeight: number): void {
    this.element = document.createElement('canvas')
    this.element.width = resolutionWidth
    this.element.height = resolutionHeight
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
