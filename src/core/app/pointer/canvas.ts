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
   * @note Image used to displace pixels
   */
  #displacementImage: HTMLImageElement

  /**
   * @type {number}
   * @note This value defines how many pixels are affected by the effect.
   *       It is defined as a proportion of the image resolution width
   */
  #displacementImageSize: number

  /**
   * @type {number}
   * @note This value defines the strength of the trailing effect on the
   *       pixels' displacement
   */
  readonly #displacementTrailingFactor: number

  /**
   * Constructor
   *
   * @param {Pane}   debugManager
   * @param {number} resolutionWidth
   * @param {number} resolutionHeight
   * @param {string} displacementImageSrc
   * @param {number} displacementSize
   * @param {number} displacementTrailingFactor
   */
  constructor(
    debugManager: Pane,
    resolutionWidth: number,
    resolutionHeight: number,
    displacementImageSrc: string,
    displacementSize: number = 0.1,
    displacementTrailingFactor: number = 0.05,
  ) {
    this.#debugManager = debugManager
    this.#displacementTrailingFactor = displacementTrailingFactor
    this.#initCanvasTexture(resolutionWidth, resolutionHeight)
    this.#initDisplacementImage(displacementImageSrc, displacementSize)
  }

  /**
   * Update
   *
   * @param   {number|null} dx
   * @param   {number|null} dy
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
    const folder = this.#debugManager.addFolder({title: 'Pointer Canvas'})

    folder
      .addBinding(
        {displacementSize: this.#displacementImageSize / this.element.width},
        'displacementSize',
        {min: 0, max: 1, step: 0.01},
      )
      .on(
        'change',
        (e) => (this.#displacementImageSize = this.element.width * e.value),
      )

    folder
      .addBinding(
        {displacementTrailingFactor: this.#displacementTrailingFactor},
        'displacementTrailingFactor',
        {min: 0, max: 1, step: 0.01},
      )
      .on('change', (e) => this.#processDisplacementImageSize(e.value))

    folder
      .addBinding({isCanvasShown: false}, 'isCanvasShown')
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
    dx -= this.#displacementImageSize / 2
    dy -= this.#displacementImageSize / 2

    this.#context.save()
    this.#context.globalCompositeOperation = 'lighten'
    this.#context.drawImage(
      this.#displacementImage,
      dx,
      dy,
      this.#displacementImageSize,
      this.#displacementImageSize,
    )
    this.#context.restore()
  }

  /**
   * Clear
   *
   * @returns {void}
   * @note    The idea is to draw a white displacement image that will
   *          indicate how much points inside them will be displaced.
   *          That is why it is required to clear the canvas with black color
   */
  #clear(): void {
    this.#context.save()
    this.#context.globalAlpha = this.#displacementTrailingFactor
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
   * Init displacement image
   *
   * @param   {string} displacementImageSrc
   * @param   {number} displacementSize
   * @returns {void}
   * @note    It is considered that the displacement image will be
   *          a white image that will indicate which pixels should be displaced
   */
  #initDisplacementImage(
    displacementImageSrc: string,
    displacementSize: number,
  ): void {
    this.#displacementImage = new Image()
    this.#displacementImage.src = displacementImageSrc
    this.#processDisplacementImageSize(displacementSize)
  }

  /**
   * Process displacement image size
   *
   * @param   {number} displacementSize
   * @returns {void}
   * @note    The aspect ratio of the image is always square
   *          (the same size is used for the width and the height of the image).
   *          It is proportional to the canvas width.
   *          This approach is considered correct because web elements
   *          adjust only their width to fit in the page
   */
  #processDisplacementImageSize(displacementSize: number): void {
    this.#displacementImageSize = displacementSize * this.element.width
  }
}
