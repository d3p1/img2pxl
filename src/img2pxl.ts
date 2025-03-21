/**
 * @description img2pxl
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 * @note        This class works as the entry point of the library.
 *              It is like a dependency injection manager (DI container).
 *              Also, it adds features not related to the app/effect itself,
 *              like enable debug to tweak app/effect parameters or
 *              effect parent container configuration
 */
import {Pane} from 'tweakpane'
import {Timer} from 'three/addons'
import App from './core/app.js'
import RendererManager from './core/lib/renderer-manager.js'
import Image from './core/app/image.js'
import Pointer from './core/app/pointer.js'
import PointerCanvas from './core/app/pointer/canvas.js'
import pointerImage from './media/processor/displacement/pointer.png'
import noiseImage from './media/processor/displacement/noise.png'

export default class Img2Pxl {
  /**
   * @type {RendererManager}
   */
  rendererManager: RendererManager

  /**
   * @type {Pane}
   */
  debugManager: Pane

  /**
   * @type {App}
   */
  #app: App

  /**
   * @type {Timer}
   */
  #timer: Timer

  /**
   * @type {boolean}
   */
  #isDebugging = false

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
   * @param {{
   *   containerSelector?: string;
   *   image: {
   *     src: string;
   *     width: number;
   *     height: number;
   *     resolution: {
   *       width: number;
   *       height: number;
   *     };
   *     pixel?: {
   *       size?: number;
   *       motion?: {
   *         displacement?: {
   *           frequency?: number;
   *           amplitude?: number;
   *         }
   *       }
   *     };
   *     motion?: {
   *       noise?: {
   *         src?: string;
   *         frequency?: number;
   *         amplitude?: number;
   *       }
   *     }
   *   };
   *   pointer?: {
   *     src?: string;
   *     size?: number;
   *     trailing?: {
   *       factor?: number;
   *     }
   *   }
   * }} config
   */
  constructor(config: {
    containerSelector?: string
    image: {
      src: string
      width: number
      height: number
      resolution: {
        width: number
        height: number
      }
      pixel?: {
        size?: number
        motion?: {
          displacement?: {
            frequency?: number
            amplitude?: number
          }
        }
      }
      motion?: {
        noise?: {
          src?: string
          frequency?: number
          amplitude?: number
        }
      }
    }
    pointer?: {
      src?: string
      size?: number
      trailing?: {
        factor?: number
      }
    }
  }) {
    this.rendererManager = new RendererManager(
      config.image.width,
      config.image.height,
    )
    this.#timer = new Timer()

    this.#initDebugManager()
    this.#initApp(
      config.image.src,
      config.image.resolution.width,
      config.image.resolution.height,
      config.image.pixel?.size,
      config.image.motion?.noise?.src,
      config.image.motion?.noise?.frequency,
      config.image.motion?.noise?.amplitude,
      config.pointer?.src,
      config.pointer?.size,
      config.pointer?.trailing?.factor,
      config.image.pixel?.motion?.displacement?.frequency,
      config.image.pixel?.motion?.displacement?.amplitude,
    )

    if (config.containerSelector) {
      this.#initDom(config.containerSelector)
    }
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
   * Debug
   *
   * @returns {void}
   */
  debug(): void {
    if (!this.#isDebugging) {
      this.debugManager.element.style.display = 'block'
      this.#app.debug()
      this.#isDebugging = true
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
   * Handle debug
   *
   * @param   {KeyboardEvent} e
   * @returns {void}
   */
  #handleDebug(e: KeyboardEvent): void {
    if (e.key === 'd') {
      this.debug()
    }
  }

  /**
   * Init app
   *
   * @param   {string} imageSrc
   * @param   {number} resolutionWidth
   * @param   {number} resolutionHeight
   * @param   {number} pointSize
   * @param   {string} noiseImageSrc
   * @param   {number} noiseFrequency
   * @param   {number} noiseAmplitude
   * @param   {string} pointerImageSrc
   * @param   {number} pointerImageSize
   * @param   {number} pointerTrailingFactor
   * @param   {number} displacementFrequency
   * @param   {number} displacementAmplitude
   * @returns {void}
   */
  #initApp(
    imageSrc: string,
    resolutionWidth: number,
    resolutionHeight: number,
    pointSize: number = 1,
    noiseImageSrc: string = noiseImage,
    noiseFrequency: number = 0.05,
    noiseAmplitude: number = 3,
    pointerImageSrc: string = pointerImage,
    pointerImageSize: number = 0.15,
    pointerTrailingFactor: number = 0.01,
    displacementFrequency: number = 5,
    displacementAmplitude: number = 40,
  ): void {
    this.#app = new App(
      new Image(
        this.rendererManager,
        this.debugManager,
        imageSrc,
        resolutionWidth,
        resolutionHeight,
        pointSize,
      ),
      new Pointer(
        this.rendererManager,
        new PointerCanvas(
          this.debugManager,
          resolutionWidth,
          resolutionHeight,
          pointerImageSrc,
          pointerImageSize,
          pointerTrailingFactor,
        ),
      ),
      this.rendererManager,
      this.debugManager,
      noiseImageSrc,
      noiseFrequency,
      noiseAmplitude,
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
    this.debugManager = new Pane()

    this.debugManager.element.style.display = 'none'
    this.#boundDebug = this.#handleDebug.bind(this)
    window.addEventListener('keydown', this.#boundDebug)
  }

  /**
   * Init DOM
   *
   * @param   {string} containerSelector
   * @returns {void}
   */
  #initDom(containerSelector: string): void {
    const node = document.querySelector(containerSelector)
    node?.appendChild(this.rendererManager.renderer.domElement)
    node?.appendChild(this.debugManager.element)
  }
}
