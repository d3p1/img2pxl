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
  public render(): void {}
}
