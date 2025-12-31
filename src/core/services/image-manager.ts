/**
 * @description Image manager
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 * @note        The idea behind this class is to encapsulate and wrap the
 *              image management logic.
 *              It is defined an image by breakpoint, so it is necessary
 *              to handle which image should be used
 */
import {ImgSource, ImgSourceCollection} from '../../types'

/**
 * @note The `0` breakpoint for image must always be set.
 *       It defines the image that should be used by default
 */
const DEFAULT_IMAGE_BREAKPOINT = 0

export default class ImageManager {
  /**
   * @type {{
   *   src       : string;
   *   width     : number;
   *   height    : number;
   *   resolution: {
   *     width : number;
   *     height: number;
   *   }
   *   pixel?: {
   *     size     ?: number;
   *     alphaTest?: number;
   *     motion   ?: {
   *       displacement?: {
   *         frequency?: number;
   *         amplitude?: number;
   *       };
   *     };
   *   };
   *   motion?: {
   *     noise?: {
   *       src      ?: string;
   *       frequency?: number;
   *       amplitude?: number;
   *     };
   *   };
   * }[]}
   */
  images: ImgSourceCollection

  /**
   * @type {{
   *   src       : string;
   *   width     : number;
   *   height    : number;
   *   resolution: {
   *     width : number;
   *     height: number;
   *   };
   *   pixel?: {
   *     size     ?: number;
   *     alphaTest?: number;
   *     motion   ?: {
   *       displacement?: {
   *         frequency?: number;
   *         amplitude?: number;
   *       }
   *     };
   *   };
   *   motion?: {
   *     noise?: {
   *       src      ?: string;
   *       frequency?: number;
   *       amplitude?: number;
   *     };
   *   };
   * }}
   */
  currentImage: ImgSource

  /**
   * @type {number}
   */
  #currentBreakpoint: number

  /**
   * @type {number[]}
   */
  #breakpoints: number[]

  /**
   * Constructor
   *
   * @param  {{
   *             src       : string;
   *             width     : number;
   *             height    : number;
   *             resolution: {
   *               width : number;
   *               height: number;
   *             };
   *             pixel?: {
   *               size     ?: number;
   *               alphaTest?: number;
   *               motion   ?: {
   *                 displacement?: {
   *                   frequency?: number;
   *                   amplitude?: number;
   *                 };
   *               };
   *             };
   *             motion?: {
   *               noise?: {
   *                 src      ?: string;
   *                 frequency?: number;
   *                 amplitude?: number;
   *               };
   *             };
   *         }[]} images
   * @throws {Error}
   */
  constructor(images: ImgSourceCollection) {
    this.images = images
    this.#initBreakpointsFromImages(Object.keys(this.images).map(Number))
    this.update()
  }

  /**
   * Taking into consideration window size,
   * it is selected the breakpoint and image to be used
   *
   * @returns {boolean}
   * @note    Each breakpoint defines the `min-width` at which
   *          a specific image should be used.
   *          That is why it is returned
   *          the greater breakpoint that is less than or equal
   *          the window size
   */
  update(): boolean {
    const width = window.innerWidth

    const currentBreakpoint = this.#breakpoints.reduce(
      (max, breakpoint) =>
        breakpoint <= width && breakpoint > max ? breakpoint : max,
      DEFAULT_IMAGE_BREAKPOINT,
    )

    if (currentBreakpoint !== this.#currentBreakpoint) {
      this.#currentBreakpoint = currentBreakpoint
      this.currentImage = this.images[this.#currentBreakpoint]
      return true
    }

    return false
  }

  /**
   * Init breakpoints from image
   *
   * @param   {number[]} breakpoints
   * @returns {void}
   * @throws  {Error}
   */
  #initBreakpointsFromImages(breakpoints: number[]): void {
    if (
      breakpoints.find(
        (breakpoint) => breakpoint === DEFAULT_IMAGE_BREAKPOINT,
      ) === undefined
    ) {
      throw new Error(
        'The `0` breakpoint is required. It defines the default image that should be used.',
      )
    }

    this.#breakpoints = breakpoints
  }
}
