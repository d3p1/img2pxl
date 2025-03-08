/**
 * @description Image
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 * @note        This class handles the logic related to the
 *              transformation of the image into vertices/points/pixels
 */
import GUI from 'lil-gui'
import * as THREE from 'three'
import RendererManager from '../lib/renderer-manager.js'
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
   * @type {GUI}
   */
  #debugManager

  /**
   * Constructor
   *
   * @param {RendererManager} rendererManager
   * @param {GUI}             debugManager
   * @param {string}          imageSrc
   * @param {number}          resolutionWidth
   * @param {number}          resolutionHeight
   * @param {number}          pointSize
   */
  constructor(
    rendererManager,
    debugManager,
    imageSrc,
    resolutionWidth,
    resolutionHeight,
    pointSize = 1,
  ) {
    this.#rendererManager = rendererManager
    this.#debugManager = debugManager
    this.#initPoints(imageSrc, resolutionWidth, resolutionHeight, pointSize)
  }

  /**
   * Enable debug mode
   *
   * @returns {void}
   */
  debug() {
    const folder = this.#debugManager.addFolder('Image')

    folder
      .add(
        {resolutionWidth: this.points.geometry.parameters.widthSegments},
        'resolutionWidth',
      )
      .min(0)
      .max(this.points.geometry.parameters.width)
      .step(1)
      .onFinishChange((value) => {
        this.#replaceImageGeometry(
          value,
          this.points.geometry.parameters.heightSegments,
        )
      })

    folder
      .add(
        {resolutionHeight: this.points.geometry.parameters.heightSegments},
        'resolutionHeight',
      )
      .min(0)
      .max(this.points.geometry.parameters.height)
      .step(1)
      .onFinishChange((value) => {
        this.#replaceImageGeometry(
          this.points.geometry.parameters.widthSegments,
          value,
        )
      })

    folder
      .add(
        {pointSize: this.points.material.uniforms.uPointSize.value},
        'pointSize',
      )
      .min(1)
      .max(100)
      .step(1)
      .onFinishChange((value) => {
        this.points.material.uniforms.uPointSize.value = value
      })
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
   */
  #initPoints(imageSrc, resolutionWidth, resolutionHeight, pointSize) {
    const textureLoader = new THREE.TextureLoader()
    this.#imageTexture = textureLoader.load(imageSrc)

    const imageGeometry = this.#createImageGeometry(
      resolutionWidth,
      resolutionHeight,
    )

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

  /**
   * Replace image geometry
   *
   * @param   {number} resolutionWidth
   * @param   {number} resolutionHeight
   * @returns {void}
   * @note    It is sent old attributes to be persisted by the new geometry.
   *          New generated geometry attributes will replace old ones if
   *          they exist in the old geometry
   */
  #replaceImageGeometry(resolutionWidth, resolutionHeight) {
    const attributes = this.points.geometry.attributes
    this.points.geometry.dispose()
    this.points.geometry = this.#createImageGeometry(
      resolutionWidth,
      resolutionHeight,
      attributes,
    )
  }

  /**
   * Create image geometry
   *
   * @param   {number}      resolutionWidth
   * @param   {number}      resolutionHeight
   * @param   {object|null} attributes
   * @returns {THREE.PlaneGeometry}
   * @note    It is removed the index and normals from the geometry
   *          to improve performance.
   *          Normals are not going to be needed.
   *          The index could cause the draw of multiple points/pixels in the
   *          same place. That is why it is required to remove it
   */
  #createImageGeometry(resolutionWidth, resolutionHeight, attributes = null) {
    const geometry = new THREE.PlaneGeometry(
      this.#rendererManager.width,
      this.#rendererManager.height,
      resolutionWidth,
      resolutionHeight,
    )
    geometry.setIndex(null)
    geometry.deleteAttribute('normal')

    if (attributes) {
      geometry.attributes = {...attributes, ...geometry.attributes}
    }

    return geometry
  }
}
