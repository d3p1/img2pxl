/**
 * @description img2pxl.js
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import {Timer} from 'three/addons'
import App from './core/app.js'
import Image from './core/app/image.js'

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
   * @param {string} src
   * @param {number} width
   * @param {number} height
   * @param {number} pixelCount
   */
  constructor(src, width, height, pixelCount = 128) {
    this.#initApp(src, width, height, pixelCount)

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

    this.#app.update(this.#timer.getDelta())

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

  /**
   * Init app
   *
   * @param   {string} src
   * @param   {number} width
   * @param   {number} height
   * @param   {number} pixelCount
   * @returns {void}
   */
  #initApp(src, width, height, pixelCount) {
    const image = new Image(src, pixelCount)
    this.#app = new App(image, width, height, pixelCount)
  }
}
