/**
 * @description Image
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import * as THREE from 'three'
import DisplacementTexture from './utils/displacement-texture.js'
import imageVertexShader from './shader/vertex.glsl'
import imageFragmentShader from './shader/fragment.glsl'

export default class Image {
  /**
   * @type {THREE.Points}
   */
  points

  /**
   * @type {THREE.Texture}
   */
  #imageTexture

  /**
   * @type {DisplacementTexture}
   */
  #displacementTexture

  /**
   * Constructor
   *
   * @param {string} src
   * @param {number} pixelCount
   */
  constructor(src, pixelCount) {
    this.#initDisplacementTexture(pixelCount)
    this.#initPoints(src, pixelCount)
  }

  /**
   * Update
   *
   * @param   {number} elapsedTime
   * @param   {number} deltaTime
   * @returns {void}
   */
  update(elapsedTime, deltaTime) {
    this.#displacementTexture.update(elapsedTime, deltaTime)
  }

  /**
   * Dispose
   *
   * @returns {void}
   */
  dispose() {
    this.points.geometry.dispose()

    this.#imageTexture.dispose()
    this.#displacementTexture.dispose()
    this.points.material.dispose()
  }

  /**
   * Init points
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
  #initPoints(src, pixelCount) {
    const textureLoader = new THREE.TextureLoader()
    this.#imageTexture = textureLoader.load(src)

    const imageGeometry = new THREE.PlaneGeometry(1, 1, pixelCount, pixelCount)
    const imageMaterial = new THREE.ShaderMaterial({
      vertexShader: imageVertexShader,
      fragmentShader: imageFragmentShader,
      uniforms: {
        uImageTexture: new THREE.Uniform(this.#imageTexture),
        uDisplacementTexture: new THREE.Uniform(
          this.#displacementTexture.texture,
        ),
        uPointSize: 0.01,
      },
    })
    this.points = new THREE.Points(imageGeometry, imageMaterial)
  }

  /**
   * Init displacement texture
   *
   * @param   {number} pixelCount
   * @returns {void}
   */
  #initDisplacementTexture(pixelCount) {
    this.#displacementTexture = new DisplacementTexture(pixelCount)
  }
}
