/**
 * @description Image processor
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import {IPixel} from '../../core/api/data/particle/pixel'
import IPixelUpdateHandler from '../api/image-processor/handler/pixel-update-handler'
import IImageProcessor from '../api/image-processor'

export default class ImageProcessor implements IImageProcessor {
  /**
   * Constructor
   *
   * @param {CanvasRenderingContext2D} _context
   * @param {Object[]}                 _pixels
   * @param {IPixelUpdateHandler}      _pixelUpdateHandler
   */
  constructor(
    protected _context: CanvasRenderingContext2D,
    protected _pixels: IPixel[],
    protected _pixelUpdateHandler: IPixelUpdateHandler
  ) {}

  /**
   * @inheritdoc
   */
  public render(): void {
    this.#refresh()
    for (const pixel of this._pixels) {
      this._renderPixel(pixel)
      this._updatePixel(pixel)
    }
  }

  /**
   * Render pixel
   *
   * @param   {Object} pixel
   * @returns {void}
   */
  protected _renderPixel(pixel: IPixel): void {
    this._context.fillStyle = this.#getFillStyleFromPixel(pixel)
    this._context.rect(pixel.x, pixel.y, pixel.size, pixel.size)
  }

  /**
   * Update pixel
   *
   * @param   {Object} pixel
   * @returns {void}
   */
  protected _updatePixel(pixel: IPixel): void {
    this._pixelUpdateHandler.updatePixel(pixel, this._context)
  }

  /**
   * Clear canvas
   *
   * @returns void
   */
  #refresh(): void {
    const canvas = this._context.canvas
    this._context.clearRect(
      0,
      0,
      canvas.width,
      canvas.height,
    )
  }

  /**
   * Get fill style from pixel
   *
   * @param   {Object} pixel
   * @returns {string}
   */
  #getFillStyleFromPixel(pixel: IPixel): string {
    return `rgba(${pixel.color.join(',')})`
  }
}
