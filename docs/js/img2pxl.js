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
   * @param {number} pixelForce
   * @param {number} pointerForce
   * @param {number} pointerRadius
   */
  constructor(imageSrc, pixelForce, pointerForce, pointerRadius) {
    this.#initCanvas()
    this.#initImage(imageSrc)
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
   * @returns {void}
   */
  #initImage(src) {
    const img = new Image()
    img.src = src
    img.onload = () => {
      this.#canvas.width = img.width
      this.#canvas.height = img.height
      this.#ctx.drawImage(img, 0, 0)

      this.#initPixels()
    }
  }

  /**
   * Init image pixels
   *
   * @returns {void}
   */
  #initPixels() {
    const imageData = this.#ctx.getImageData(
      0,
      0,
      this.#canvas.width,
      this.#canvas.height,
    )

    const data = imageData.data
    for (let i = 0; i < data.length; i += 4) {
      if (data[i + 3] > 0) {
        const x = Math.floor((i % (imageData.width * 4)) / 4)
        const y = Math.floor(i / (imageData.width * 4))
        this.#pixels.push(
          new Pixel(x, y, data[i], data[i + 1], data[i + 2], this.#pixelForce),
        )
      }
    }
  }
}
