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
import {Config} from './types'
import ImageManager from './core/lib/image-manager.ts'

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
   * @type {ImageManager}
   */
  #imageManager: ImageManager

  /**
   * @type {Timer}
   */
  #timer: Timer

  /**
   * @type {{
   *   containerSelector?: string;
   *   image             : {
   *     src       : string;
   *     width     : number;
   *     height    : number;
   *     resolution: {
   *       width : number;
   *       height: number;
   *     };
   *     pixel?: {
   *       size  ?: number;
   *       motion?: {
   *         displacement?: {
   *           frequency?: number;
   *           amplitude?: number;
   *         }
   *       }
   *     };
   *     motion?: {
   *       noise?: {
   *         src      ?: string;
   *         frequency?: number;
   *         amplitude?: number;
   *       }
   *     }
   *   }[];
   *   pointer?: {
   *     src     ?: string;
   *     size    ?: number;
   *     trailing?: {
   *       factor?: number;
   *     }
   *   }
   * }}
   */
  #config: Config

  /**
   * @type {boolean}
   */
  #isDebugging: boolean = false

  /**
   * @type {number}
   */
  #requestAnimationId: number

  /**
   * @type {Function}
   */
  #boundHandleDebug: (e: KeyboardEvent) => void

  /**
   * @type {Function}
   */
  #boundHandleResize: (e: Event) => void

  /**
   * Constructor
   *
   * @param  {{
   *             containerSelector?: string;
   *             image             : {
   *               src       : string;
   *               width     : number;
   *               height    : number;
   *               resolution: {
   *                 width : number;
   *                 height: number;
   *               };
   *               pixel?: {
   *                 size  ?: number;
   *                 motion?: {
   *                   displacement?: {
   *                     frequency?: number;
   *                     amplitude?: number;
   *                   }
   *                 }
   *               };
   *               motion?: {
   *                 noise?: {
   *                   src      ?: string;
   *                   frequency?: number;
   *                   amplitude?: number;
   *                 }
   *               }
   *             }[];
   *             pointer?: {
   *               src     ?: string;
   *               size    ?: number;
   *               trailing?: {
   *                 factor?: number;
   *               }
   *             }
   *         }} config
   * @throws {Error}
   */
  constructor(config: Config) {
    this.#config = config
    this.#imageManager = new ImageManager(this.#config.images)

    this.#init()
    this.#boundHandleResize = () => {
      if (this.#imageManager.update()) {
        this.dispose()
        this.#init()
      }
    }
    window.addEventListener('resize', this.#boundHandleResize)
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
    window.removeEventListener('keydown', this.#boundHandleDebug)
    window.removeEventListener('resize', this.#boundHandleResize)
    this.#timer.dispose()
    this.#app.dispose()
    this.rendererManager.dispose()
    this.debugManager.dispose()
  }

  /**
   * Render
   *
   * @params  {number} t
   * @returns {void}
   */
  #render(t = 0): void {
    this.#timer.update(t)

    this.#app.update(this.#timer.getElapsed())

    this.#requestAnimationId = requestAnimationFrame(this.#render.bind(this))
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
   * Init
   *
   * @returns {void}
   */
  #init(): void {
    this.rendererManager = new RendererManager(
      this.#imageManager.currentImage.width,
      this.#imageManager.currentImage.height,
    )
    this.#timer = new Timer()

    this.#initDebugManager()
    this.#initApp()

    if (this.#config.containerSelector) {
      this.#initDom(this.#config.containerSelector)
    }

    this.#render()
  }

  /**
   * Init app
   *
   * @returns {void}
   */
  #initApp(): void {
    this.#app = new App(
      new Image(
        this.rendererManager,
        this.debugManager,
        this.#imageManager.currentImage.src,
        this.#imageManager.currentImage.resolution.width,
        this.#imageManager.currentImage.resolution.height,
        this.#imageManager.currentImage.pixel?.size ?? 1,
      ),
      new Pointer(
        this.rendererManager,
        new PointerCanvas(
          this.debugManager,
          this.#imageManager.currentImage.resolution.width,
          this.#imageManager.currentImage.resolution.height,
          this.#config.pointer?.src ?? pointerImage,
          this.#config.pointer?.size ?? 0.15,
          this.#config.pointer?.trailing?.factor ?? 0.01,
        ),
      ),
      this.rendererManager,
      this.debugManager,
      this.#imageManager.currentImage.motion?.noise?.src ?? noiseImage,
      this.#imageManager.currentImage.motion?.noise?.frequency ?? 0.05,
      this.#imageManager.currentImage.motion?.noise?.amplitude ?? 3,
      this.#imageManager.currentImage.pixel?.motion?.displacement?.frequency ??
        5,
      this.#imageManager.currentImage.pixel?.motion?.displacement?.amplitude ??
        4,
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
    this.#boundHandleDebug = this.#handleDebug.bind(this)
    window.addEventListener('keydown', this.#boundHandleDebug)
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
