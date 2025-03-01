/**
 * @description img2pxl.js
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import * as THREE from 'three'
import Renderer from './app/renderer.js'

export default class Img2Pxl {
  /**
   * @type Renderer
   */
  #renderer

  /**
   * @type {number}
   */
  #requestAnimationId

  /**
   * Constructor
   *
   * @param {string}   src
   * @param {number}   width
   * @param {number}   height
   * @param {number}   pixelCount
   * @param {Renderer} renderer
   */
  constructor(
    src,
    width,
    height,
    pixelCount = 128,
    renderer = new Renderer(src, width, height, pixelCount),
  ) {
    this.#renderer = renderer
  }

  /**
   * Run
   *
   * @params  {number} t
   * @returns {void}
   */
  run(t = 0) {
    this.#renderer.render()
    this.#requestAnimationId = requestAnimationFrame(this.run.bind(this))
  }

  /**
   * Dispose
   *
   * @returns {void}
   */
  dispose() {
    cancelAnimationFrame(this.#requestAnimationId)
    this.#renderer.dispose()
  }
}
