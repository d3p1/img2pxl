/**
 * @description img2pxl.js
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import {Timer} from 'three/addons'
import App from './core/app.js'
import RendererManager from './core/renderer-manager.js'
import Image from './core/app/image.js'
import glowImage from './media/processor/displacement/glow.png'

export default class Img2Pxl {
  /**
   * @type {App}
   */
  #app

  /**
   * @type {Timer}
   */
  #timer

  /**
   * @type {number}
   */
  #requestAnimationId

  /**
   * Constructor
   *
   * @param {string} imageSrc
   * @param {number} width
   * @param {number} height
   * @param {number} resolutionWidth
   * @param {number} resolutionHeight
   * @param {string} displacementImageSrc
   */
  constructor(
    imageSrc,
    width,
    height,
    resolutionWidth = 128,
    resolutionHeight = 128,
    displacementImageSrc = glowImage,
  ) {
    this.#app = new App(
      new RendererManager(width, height),
      new Image(
        imageSrc,
        width,
        height,
        resolutionWidth,
        resolutionHeight,
        displacementImageSrc,
      ),
    )

    this.#timer = new Timer()
  }

  /**
   * Render
   *
   * @params  {number} t
   * @returns {void}
   */
  render(t = 0) {
    this.#timer.update(t)

    this.#app.update(this.#timer.getElapsed(), this.#timer.getDelta())

    this.#requestAnimationId = requestAnimationFrame(this.render.bind(this))
  }

  /**
   * Dispose
   *
   * @returns {void}
   */
  dispose() {
    cancelAnimationFrame(this.#requestAnimationId)
    this.#app.dispose()
  }
}
