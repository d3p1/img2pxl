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
   * @param {number}   width
   * @param {number}   height
   * @param {Renderer} renderer
   */
  constructor(width, height, renderer = new Renderer(width, height)) {
    this.#renderer = renderer

    /**
     * @todo Remove this test code
     */
    this.#renderer.add(new THREE.Mesh(
      new THREE.BoxGeometry(1.5, 1.5, 1),
      new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true})
    ))
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