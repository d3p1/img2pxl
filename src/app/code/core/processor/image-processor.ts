/**
 * @description Image processor
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import {IPixel} from '../api/data/particle/pixel'
import IImageProcessor from '../api/image-processor'

export default class ImageProcessor implements IImageProcessor {
  /**
   * Constructor
   *
   * @param {CanvasRenderingContext2D} _context
   * @param {IPixel[]}                 _pixels
   */
  constructor(
    protected _context: CanvasRenderingContext2D,
    protected _pixels: IPixel[],
  ) {}

  /**
   * @inheritdoc
   */
  public render(): void {
    for(const pixel of this._pixels) {
      this._renderPixel(pixel)
      this._updatePixel(pixel)
    }
  }

  /**
   * Render pixel
   * 
   * @param   {IPixel} pixel 
   * @returns {void}
   */
  protected _renderPixel(pixel: IPixel): void {
    this._context.fillStyle = this.#getFillStyleFromPixel(pixel)
    this._context.rect(pixel.x, pixel.y, pixel.size, pixel.size)
  }

  /**
   * Update pixel 
   * 
   * @param   {IPixel} pixel
   * @returns {void} 
   */
  protected _updatePixel(pixel: IPixel): void {
    pixel.update()
  }

  /**
   * Get fill style from pixel
   * 
   * @param   {IPixel} pixel 
   * @returns {string}
   */
  #getFillStyleFromPixel(pixel: IPixel): string {
    return `rgba(${pixel.color.join(',')})`
  }
}
