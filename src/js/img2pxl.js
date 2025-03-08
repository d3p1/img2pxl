/**
 * @description img2pxl.js
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import {Timer} from 'three/addons'
import RendererManager from './lib/renderer-manager.js'
import App from './core/app.js'
import Image from './core/app/image.js'
import Pointer from './core/app/pointer.js'
import PointerCanvas from './core/app/pointer/canvas.js'
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
   * @param {number} pointSize
   * @param {string} displacementImageSrc
   */
  constructor(
    imageSrc,
    width,
    height,
    resolutionWidth,
    resolutionHeight,
    pointSize = 1,
    displacementImageSrc = glowImage,
  ) {
    const rendererManager = new RendererManager(width, height)

    this.#app = new App(
      new Image(
        rendererManager,
        imageSrc,
        resolutionWidth,
        resolutionHeight,
        pointSize,
      ),
      new Pointer(
        rendererManager,
        new PointerCanvas(
          resolutionWidth,
          resolutionHeight,
          displacementImageSrc,
        ),
      ),
      rendererManager,
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

    this.#app.update(this.#timer.getElapsed())

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
