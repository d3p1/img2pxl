/**
 * @description Image
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import * as THREE from 'three'
import RendererManager from '../../lib/renderer-manager.js'
import imageVertexShader from './image/shader/vertex.glsl'
import imageFragmentShader from './image/shader/fragment.glsl'

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
   * @type {RendererManager}
   */
  #rendererManager

  /**
   * Constructor
   *
   * @param {RendererManager} rendererManager
   * @param {string}          imageSrc
   * @param {number}          resolutionWidth
   * @param {number}          resolutionHeight
   * @param {number}          pointSize
   */
  constructor(
    rendererManager,
    imageSrc,
    resolutionWidth,
    resolutionHeight,
    pointSize = 1,
  ) {
    this.#rendererManager = rendererManager

    this.#initPoints(imageSrc, resolutionWidth, resolutionHeight, pointSize)
  }

  /**
   * Dispose
   *
   * @returns {void}
   */
  dispose() {
    this.points.geometry.dispose()
    this.points.material.dispose()
    this.#imageTexture.dispose()
  }

  /**
   * Init points
   *
   * @param   {string} imageSrc
   * @param   {number} resolutionWidth
   * @param   {number} resolutionHeight
   * @param   {number} pointSize
   * @returns {void}
   * @note    It is removed the index and normals from the geometry
   *          to improve performance.
   *          Normals are not going to be needed.
   *          The index could cause the draw of multiple points/pixels in the
   *          same place. That is why it is required to remove it
   */
  #initPoints(imageSrc, resolutionWidth, resolutionHeight, pointSize) {
    const textureLoader = new THREE.TextureLoader()
    this.#imageTexture = textureLoader.load(imageSrc)

    const imageGeometry = new THREE.PlaneGeometry(
      this.#rendererManager.width,
      this.#rendererManager.height,
      resolutionWidth,
      resolutionHeight,
    )
    imageGeometry.setIndex(null)
    imageGeometry.deleteAttribute('normal')

    const imageMaterial = new THREE.ShaderMaterial({
      vertexShader: imageVertexShader,
      fragmentShader: imageFragmentShader,
      uniforms: {
        uImageTexture: new THREE.Uniform(this.#imageTexture),
        uPointSize: new THREE.Uniform(pointSize),
      },
      transparent: true,
      depthWrite: false,
    })

    this.points = new THREE.Points(imageGeometry, imageMaterial)
  }
}
