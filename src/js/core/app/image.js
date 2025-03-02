/**
 * @description Image
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import * as THREE from 'three'

export default class Image {
  /**
   * @type {THREE.Mesh}
   */
  mesh

  /**
   * @type {THREE.Texture}
   */
  #texture

  /**
   * Constructor
   *
   * @param {string} src
   * @param {number} pixelCount
   */
  constructor(src, pixelCount) {
    this.#initMesh(src, pixelCount)
  }

  /**
   * Update
   *
   * @param   {number} elapsedTime
   * @param   {number} deltaTime
   * @returns {void}
   */
  update(elapsedTime, deltaTime) {
    console.log(elapsedTime)
    console.log(deltaTime)
  }

  /**
   * Dispose
   *
   * @returns {void}
   */
  dispose() {
    this.mesh.geometry.dispose()

    this.#texture.dispose()
    this.mesh.material.dispose()
  }

  /**
   * Init mesh
   *
   * @param   {string} src
   * @param   {number} pixelCount
   * @returns {void}
   * @note    The renderer will update geometry dimensions (width and height)
   *          so the image occupies the full render size. It is set
   *          a default value of `1` for the width and the height
   * @todo    Improve how texture loader is created.
   *          Add loader manager to handle loading time
   */
  #initMesh(src, pixelCount) {
    const textureLoader = new THREE.TextureLoader()
    this.#texture = textureLoader.load(src)

    const imageGeometry = new THREE.PlaneGeometry(1, 1, pixelCount, pixelCount)
    const imageMaterial = new THREE.MeshBasicMaterial({map: this.#texture})
    this.mesh = new THREE.Mesh(imageGeometry, imageMaterial)
  }
}
