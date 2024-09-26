/**
 * @description img2pxl.js
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 * @todo        Create pointer object and improve how pixel and pointer interact
 */
import Pixel from './core/pixel.js'

export default class Img2Pxl {
  /**
   * @type {Pixel[]}
   */
  #pixels = []

  /**
   * @type {number}
   */
  #pixelForce

  /**
   * @type {number}
   */
  #pointerForce

  /**
   * @type {number}
   */
  #pointerRadius

  /**
   * @type {number|null}
   */
  #pointerX = null

  /**
   * @type {number|null}
   */
  #pointerY = null

  /**
   * @type {HTMLCanvasElement}
   */
  #canvas

  /**
   * @type {CanvasRenderingContext2D}
   */
  #ctx

  /**
   * @type {number}
   */
  #t = 0

  /**
   * Constructor
   *
   * @param {string} imageSrc
   * @param {number} resolutionWidth
   * @param {number} resolutionHeight
   * @param {number} pixelForce
   * @param {number} pointerForce
   * @param {number} pointerRadius
   */
  constructor(
    imageSrc,
    resolutionWidth,
    resolutionHeight,
    pixelForce,
    pointerForce,
    pointerRadius,
  ) {
    this.#initCanvas()
    this.#initImage(imageSrc, resolutionWidth, resolutionHeight)
    this.#initPointer()
    this.#pixelForce = pixelForce
    this.#pointerForce = pointerForce
    this.#pointerRadius = pointerRadius
  }

  /**
   * Animate
   *
   * @param   {number} t
   * @returns {void}
   * @todo    Use integer values for pixel coordinates to avoid antti-aliasing
   */
  animate(t = 0) {
    const elapsed = t - this.#t
    this.#t = t

    this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height)

    for (const pixel of this.#pixels) {
      if (this.#pointerX && this.#pointerY) {
        const xDistance = pixel.x - this.#pointerX
        const yDistance = pixel.y - this.#pointerY
        const squareDistance = xDistance ** 2 + yDistance ** 2

        if (squareDistance <= this.#pointerRadius ** 2) {
          pixel.x += xDistance * (this.#pointerForce / squareDistance) * elapsed
          pixel.y += yDistance * (this.#pointerForce / squareDistance) * elapsed
        }
      }
      pixel.update(elapsed)
      pixel.draw(this.#ctx)
    }

    requestAnimationFrame(this.animate.bind(this))
  }

  /**
   * Init pointer
   *
   * @returns {void}
   */
  #initPointer() {
    this.#canvas.addEventListener('mousemove', (e) => {
      this.#pointerX = e.offsetX
      this.#pointerY = e.offsetY
    })

    this.#canvas.addEventListener('mouseout', () => {
      this.#pointerX = null
      this.#pointerY = null
    })
  }

  /**
   * Init canvas
   *
   * @returns {void}
   */
  #initCanvas() {
    this.#canvas = document.createElement('canvas')
    this.#ctx = this.#canvas.getContext('2d')
    document.body.appendChild(this.#canvas)
  }

  /**
   * Init image
   *
   * @param   {string} src
   * @param   {number} resolutionWidth
   * @param   {number} resolutionHeight
   * @returns {void}
   */
  #initImage(src, resolutionWidth, resolutionHeight) {
    const img = new Image()
    img.src = src
    img.onload = () => {
      this.#canvas.width = img.width
      this.#canvas.height = img.height
      this.#initPixels(img, resolutionWidth, resolutionHeight)
    }
  }

  /**
   * Init image pixels
   *
   * @param   {HTMLImageElement} img
   * @param   {number}           resolutionWidth
   * @param   {number}           resolutionHeight
   * @returns {void}
   */
  #initPixels(img, resolutionWidth, resolutionHeight) {
    const pixelWidth = img.width / resolutionWidth
    const pixelHeight = img.height / resolutionHeight

    for (let i = 0; i < resolutionWidth * resolutionHeight; i++) {
      const xDisplacement = pixelWidth * i
      this.#pixels.push(
        new Pixel(
          img,
          xDisplacement % img.width,
          pixelHeight * (xDisplacement / img.width),
          pixelWidth,
          pixelHeight,
          this.#pixelForce,
        ),
      )
    }
  }
}
