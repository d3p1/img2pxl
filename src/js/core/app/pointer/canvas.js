/**
 * @description Pointer canvas
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 * @note        This canvas will be used as a texture that will be sent
 *              to the vertex shader. This texture will be updated
 *              to mark where the pointer is in relation with the image.
 *              It that way, it allows to select which vertices/points/pixels
 *              should be displaced
 */
import * as THREE from 'three'

export default class Canvas {
  /**
   * @type {THREE.CanvasTexture}
   */
  texture

  /**
   * @type {HTMLCanvasElement}
   */
  element

  /**
   * @type {CanvasRenderingContext2D}
   */
  #context

  /**
   * @type {HTMLImageElement}
   * @note Image used to displace pixels
   */
  #displacementImage

  /**
   * @type {number}
   * @note This value defines how many pixels are affected by the effect.
   *       It is defined as a proportion of the image resolution width
   */
  #displacementImageSize

  /**
   * @type {number}
   * @note This value defines the strength of the trailing effect on the
   *       pixels' displacement
   */
  #displacementTrailingFactor

  /**
   * Constructor
   *
   * @param {number} resolutionWidth
   * @param {number} resolutionHeight
   * @param {string} displacementImageSrc
   * @param {number} displacementSize
   * @param {number} displacementTrailingFactor
   */
  constructor(
    resolutionWidth,
    resolutionHeight,
    displacementImageSrc,
    displacementSize = 0.1,
    displacementTrailingFactor = 0.05,
  ) {
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
  update(dx, dy) {
    this.#clear()

    if (dx && dy) {
      this.#draw(dx, dy)
    }

    this.texture.needsUpdate = true
  }

  /**
   * Dispose
   *
   * @returns {void}
   */
  dispose() {
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
  #draw(dx, dy) {
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
  #clear() {
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
  #initCanvasTexture(resolutionWidth, resolutionHeight) {
    this.element = document.createElement('canvas')
    this.element.width = resolutionWidth
    this.element.height = resolutionHeight
    this.texture = new THREE.CanvasTexture(this.element)

    this.#context = this.element.getContext('2d')
  }

  /**
   * Init displacement image
   *
   * @param   {string} displacementImageSrc
   * @param   {number} displacementSize
   * @returns {void}
   * @note    It is considered that the displacement image will be
   *          a white image that will indicate which pixels should be displaced
   * @note    The aspect ratio of the image is always square
   *          (the same size is used for the width and the height of the image).
   *          It is proportional to the canvas width.
   *          This approach is considered correct because web elements
   *          adjust only their width to fit in the page
   */
  #initDisplacementImage(displacementImageSrc, displacementSize) {
    this.#displacementImage = new Image()
    this.#displacementImage.src = displacementImageSrc
    this.#displacementImageSize = displacementSize * this.element.width
  }
}
