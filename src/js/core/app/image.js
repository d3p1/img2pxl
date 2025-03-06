/**
 * @description Image
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import * as THREE from 'three'
import DisplacementProcessor from './image/processor/displacement-processor.js'
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
   * @type {DisplacementProcessor}
   */
  #displacementProcessor

  /**
   * Constructor
   *
   * @param {string} imageSrc
   * @param {number} width
   * @param {number} height
   * @param {number} resolutionWidth
   * @param {number} resolutionHeight
   * @param {string} displacementImageSrc
   * @param {number} displacementFrequency
   * @param {number} pointSize
   */
  constructor(
    imageSrc,
    width,
    height,
    resolutionWidth,
    resolutionHeight,
    displacementImageSrc,
    displacementFrequency = 5,
    pointSize = 3,
  ) {
    this.#initDisplacementProcessor(
      resolutionWidth,
      resolutionHeight,
      displacementImageSrc,
    )
    this.#initPoints(
      imageSrc,
      width,
      height,
      resolutionWidth,
      resolutionHeight,
      displacementFrequency,
      pointSize,
    )
  }

  /**
   * Update
   *
   * @param   {number[]|null} intersection
   * @param   {number}        elapsed
   * @returns {void}
   */
  update(intersection, elapsed) {
    this.points.material.uniforms.uTime.value = elapsed
    this.#displacementProcessor.update(intersection)
  }

  /**
   * Dispose
   *
   * @returns {void}
   */
  dispose() {
    this.points.geometry.dispose()

    this.#imageTexture.dispose()
    this.#displacementProcessor.dispose()
    this.points.material.dispose()
  }

  /**
   * Init points
   *
   * @param   {string} imageSrc
   * @param   {number} width
   * @param   {number} height
   * @param   {number} resolutionWidth
   * @param   {number} resolutionHeight
   * @param   {number} displacementFrequency
   * @param   {number} pointSize
   * @returns {void}
   */
  #initPoints(
    imageSrc,
    width,
    height,
    resolutionWidth,
    resolutionHeight,
    displacementFrequency,
    pointSize,
  ) {
    const textureLoader = new THREE.TextureLoader()
    this.#imageTexture = textureLoader.load(imageSrc)

    const imageGeometry = new THREE.PlaneGeometry(
      width,
      height,
      resolutionWidth,
      resolutionHeight,
    )
    imageGeometry.setIndex(null)
    imageGeometry.deleteAttribute('normal')
    this.#addAttributesToImageGeometry(imageGeometry)

    const imageMaterial = new THREE.ShaderMaterial({
      vertexShader: imageVertexShader,
      fragmentShader: imageFragmentShader,
      uniforms: {
        uTime: new THREE.Uniform(0),
        uDisFrequency: new THREE.Uniform(displacementFrequency),
        uDisAmplitude: new THREE.Uniform(50),
        uImageTexture: new THREE.Uniform(this.#imageTexture),
        uDisTexture: new THREE.Uniform(this.#displacementProcessor.texture),
        uPointSize: new THREE.Uniform(pointSize),
      },
      transparent: true,
      depthWrite: false,
    })
    this.points = new THREE.Points(imageGeometry, imageMaterial)
  }

  /**
   * Add attributes to image geometry
   *
   * @param   {THREE.BufferGeometry} imageGeometry
   * @returns {void}
   */
  #addAttributesToImageGeometry(imageGeometry) {
    const vertices = imageGeometry.attributes.position.count
    const disAngleArray = new Float32Array(vertices)
    const disAmplitudeArray = new Float32Array(vertices)

    for (let i = 0; i < vertices; i++) {
      disAngleArray[i] = Math.random() * 2 * Math.PI
      disAmplitudeArray[i] = Math.random()
    }

    imageGeometry.setAttribute(
      'aDisAngle',
      new THREE.BufferAttribute(disAngleArray, 1),
    )
    imageGeometry.setAttribute(
      'aDisAmplitude',
      new THREE.BufferAttribute(disAmplitudeArray, 1),
    )
  }

  /**
   * Init displacement processor
   *
   * @param   {number} resolutionWidth
   * @param   {number} resolutionHeight
   * @param   {string} displacementImageSrc
   * @returns {void}
   */
  #initDisplacementProcessor(
    resolutionWidth,
    resolutionHeight,
    displacementImageSrc,
  ) {
    this.#displacementProcessor = new DisplacementProcessor(
      resolutionWidth,
      resolutionHeight,
      displacementImageSrc,
    )
  }
}
