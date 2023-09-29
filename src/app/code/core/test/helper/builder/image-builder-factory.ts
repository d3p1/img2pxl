/**
 * @description Image builder factory unit test helper
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 * @note        This class is intended to help in Jest unit test cases.
 *              It is necessary to import this file explicitly because it was
 *              considered that expose it globally using
 *              Jest `setupFiles` configuration could cause
 *              mantainability issues (i.e.: it would be necessary to maintain
 *              a declaration file)
 * @link        https://jestjs.io/docs/configuration#setupfiles-array
 */
import Canvas from '../util/canvas'
import ImageBuilder from '../../../builder/image-builder'

export default class ImageBuilderFactory {
  /**
   * @type {HTMLCanvasElement}
   */
  public canvas: HTMLCanvasElement

  /**
   * Constructor
   *
   * @param {number} pixelSize
   * @param {number} width
   * @param {number} height
   */
  constructor(
    public pixelSize: number,
    width: number,
    height: number,
  ) {
    this.canvas = Canvas.initCanvasWithRandomImageData(width, height)
  }

  /**
   * Create
   *
   * @returns {ImageBuilder}
   */
  create(): ImageBuilder {
    return new ImageBuilder(
      this.canvas.getContext('2d') as CanvasRenderingContext2D,
      document.createElement('img'),
      this.pixelSize,
    )
  }
}
