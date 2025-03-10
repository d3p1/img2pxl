/**
 * @description img2pxl.js
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 * @note        This class works as the entry point of the library.
 *              It is like a dependency injection manager.
 *              Also, it adds features not related to the app/effect itself,
 *              like enable debug to tweak app/effect parameters
 */
import GUI from 'lil-gui'
import {Timer} from 'three/addons'
import App from './core/app.js'
import RendererManager from './core/lib/renderer-manager.js'
import Image from './core/app/image.js'
import Pointer from './core/app/pointer.js'
import PointerCanvas from './core/app/pointer/canvas.js'
import pointerImage from './media/processor/displacement/pointer.png'

export default class Img2Pxl {
  /**
   * @type {RendererManager}
   */
  readonly #rendererManager: RendererManager

  /**
   * @type {App}
   */
  #app: App

  /**
   * @type {GUI}
   */
  #debugManager: GUI

  /**
   * @type {Timer}
   */
  #timer: Timer

  /**
   * @type {number}
   */
  #requestAnimationId: number

  /**
   * @type {Function}
   */
  #boundDebug: (e: KeyboardEvent) => void

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
   * @param {number} displacementSize
   * @param {number} displacementTrailingFactor
   * @param {number} displacementFrequency
   * @param {number} displacementAmplitude
   */
  constructor(
    imageSrc: string,
    width: number,
    height: number,
    resolutionWidth: number,
    resolutionHeight: number,
    pointSize: number = 1,
    displacementImageSrc: string = pointerImage,
    displacementSize: number = 0.15,
    displacementTrailingFactor: number = 0.01,
    displacementFrequency: number = 5,
    displacementAmplitude: number = 40,
  ) {
    this.#timer = new Timer()
    this.#rendererManager = new RendererManager(width, height)

    this.#initDebugManager()
    this.#initApp(
      imageSrc,
      resolutionWidth,
      resolutionHeight,
      pointSize,
      displacementImageSrc,
      displacementSize,
      displacementTrailingFactor,
      displacementFrequency,
      displacementAmplitude,
    )
  }

  /**
   * Render
   *
   * @params  {number} t
   * @returns {void}
   */
  render(t = 0): void {
    this.#timer.update(t)

    this.#app.update(this.#timer.getElapsed())

    this.#requestAnimationId = requestAnimationFrame(this.render.bind(this))
  }

  /**
   * Enable debug mode
   *
   * @param   {KeyboardEvent} e
   * @returns {void}
   */
  debug(e: KeyboardEvent): void {
    if (
      e.key === 'd' &&
      this.#debugManager._hidden &&
      this.#debugManager.show()
    ) {
      this.#app.debug()
    }
  }

  /**
   * Dispose
   *
   * @returns {void}
   */
  dispose(): void {
    cancelAnimationFrame(this.#requestAnimationId)
    window.removeEventListener('keydown', this.#boundDebug)
    this.#timer.dispose()
    this.#app.dispose()
  }

  /**
   * Init app
   *
   * @param   {string} imageSrc
   * @param   {number} resolutionWidth
   * @param   {number} resolutionHeight
   * @param   {number} pointSize
   * @param   {string} displacementImageSrc
   * @param   {number} displacementSize
   * @param   {number} displacementTrailingFactor
   * @param   {number} displacementFrequency
   * @param   {number} displacementAmplitude
   * @returns {void}
   */
  #initApp(
    imageSrc: string,
    resolutionWidth: number,
    resolutionHeight: number,
    pointSize: number,
    displacementImageSrc: string,
    displacementSize: number,
    displacementTrailingFactor: number,
    displacementFrequency: number,
    displacementAmplitude: number,
  ): void {
    this.#app = new App(
      new Image(
        this.#rendererManager,
        this.#debugManager,
        imageSrc,
        resolutionWidth,
        resolutionHeight,
        pointSize,
      ),
      new Pointer(
        this.#rendererManager,
        new PointerCanvas(
          this.#debugManager,
          resolutionWidth,
          resolutionHeight,
          displacementImageSrc,
          displacementSize,
          displacementTrailingFactor,
        ),
      ),
      this.#rendererManager,
      this.#debugManager,
      displacementFrequency,
      displacementAmplitude,
    )
  }

  /**
   * Init debug manager
   *
   * @returns {void}
   */
  #initDebugManager(): void {
    this.#debugManager = new GUI()

    this.#debugManager.hide()
    this.#boundDebug = this.debug.bind(this)
    window.addEventListener('keydown', this.#boundDebug)
  }
}
