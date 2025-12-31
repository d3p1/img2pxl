/**
 * @description Image
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 * @note        This class handles the logic related to the
 *              transformation of the image into vertices/points/pixels
 */
import * as THREE from 'three'
import RendererManager from '../../../services/renderer-manager.js'
import DebugManager from '../../../services/debug-manager.js'
import imageVertexShader from './image/shader/vertex.glsl'
import imageFragmentShader from './image/shader/fragment.glsl'

export default class Image {
  /**
   * @type {THREE.Points}
   */
  points: THREE.Points<THREE.PlaneGeometry, THREE.ShaderMaterial>

  /**
   * @type {THREE.Texture}
   */
  #imageTexture: THREE.Texture

  /**
   * @type {RendererManager}
   */
  #rendererManager: RendererManager

  /**
   * @type {DebugManager}
   */
  #debugManager: DebugManager

  /**
   * Constructor
   *
   * @param {RendererManager} rendererManager
   * @param {DebugManager}    debugManager
   * @param {string}          imageSrc
   * @param {number}          resolutionWidth
   * @param {number}          resolutionHeight
   * @param {number}          pointSize
   * @param {number}          alphaTest
   */
  constructor(
    rendererManager: RendererManager,
    debugManager: DebugManager,
    imageSrc: string,
    resolutionWidth: number,
    resolutionHeight: number,
    pointSize: number = 1,
    alphaTest: number = 0.1,
  ) {
    this.#rendererManager = rendererManager
    this.#debugManager = debugManager
    this.#initPoints(
      imageSrc,
      resolutionWidth,
      resolutionHeight,
      pointSize,
      alphaTest,
    )
  }

  /**
   * Enable debug mode
   *
   * @returns {void}
   */
  debug(): void {
    const resolutionFolder = this.#debugManager.addFolder({
      title: 'Image Resolution',
    })

    this.#debugManager
      .addBinding(
        'width',
        this.points.geometry.parameters.widthSegments,
        {min: 0, max: this.points.geometry.parameters.width, step: 1},
        resolutionFolder,
      )
      .on('change', (e) => {
        if (e.last) {
          this.#replaceImageGeometry(
            e.value,
            this.points.geometry.parameters.heightSegments,
          )
        }
      })

    this.#debugManager
      .addBinding(
        'height',
        this.points.geometry.parameters.heightSegments,
        {min: 0, max: this.points.geometry.parameters.height, step: 1},
        resolutionFolder,
      )
      .on('change', (e) => {
        if (e.last) {
          this.#replaceImageGeometry(
            this.points.geometry.parameters.widthSegments,
            e.value,
          )
        }
      })

    const pixelFolder = this.#debugManager.addFolder({title: 'Image Pixel'})

    this.#debugManager
      .addBinding(
        'size',
        this.points.material.uniforms.uPointSize.value,
        {min: 1, max: 100, step: 1},
        pixelFolder,
      )
      .on('change', (e) => {
        if (e.last) {
          this.points.material.uniforms.uPointSize.value = e.value
        }
      })
  }

  /**
   * Dispose
   *
   * @returns {void}
   */
  dispose(): void {
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
   * @param   {number} alphaTest
   * @returns {void}
   */
  #initPoints(
    imageSrc: string,
    resolutionWidth: number,
    resolutionHeight: number,
    pointSize: number,
    alphaTest: number,
  ): void {
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
        uAlphaTest: new THREE.Uniform(alphaTest),
      },
      transparent: true,
      depthWrite: false,
      alphaTest: alphaTest,
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
  #replaceImageGeometry(
    resolutionWidth: number,
    resolutionHeight: number,
  ): void {
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
   * @param   {number}                              resolutionWidth
   * @param   {number}                              resolutionHeight
   * @param   {THREE.NormalBufferAttributes | null} attributes
   * @returns {THREE.PlaneGeometry}
   * @note    It is created a plane that occupies all the render
   * @note    The dom element width and height of the renderer include
   *          the device pixel ratio, so it is important to use them
   *          to create a plane that take all the render space/pixels
   * @note    It is removed the index and normals from the geometry
   *          to improve performance.
   *          Normals are not going to be needed.
   *          The index could cause the draw of multiple points/pixels in the
   *          same place. That is why it is required to remove it
   */
  #createImageGeometry(
    resolutionWidth: number,
    resolutionHeight: number,
    attributes: THREE.NormalBufferAttributes | null = null,
  ): THREE.PlaneGeometry {
    const geometry = new THREE.PlaneGeometry(
      this.#rendererManager.renderer.domElement.width,
      this.#rendererManager.renderer.domElement.height,
      resolutionWidth * this.#rendererManager.dpr,
      resolutionHeight * this.#rendererManager.dpr,
    )
    geometry.setIndex(null)
    geometry.deleteAttribute('normal')

    if (attributes) {
      geometry.attributes = {...attributes, ...geometry.attributes}
    }

    return geometry
  }
}
