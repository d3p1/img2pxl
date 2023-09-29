/**
 * @description Image processor factory unit test helper
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 * @note        This entity is intended to help in Jest unit test cases.
 *              It is necessary to import this file explicitly because it was
 *              considered that expose it globally using
 *              Jest `setupFiles` configuration could cause
 *              mantainability issues (i.e.: it would be necessary to maintain
 *              a declaration file)
 * @link        https://jestjs.io/docs/configuration#setupfiles-array
 */
import {IPixel} from '../../../api/data/particle/pixel'
import IImageProcessor from '../../../api/image-processor'
import ObjectManager from '../util/canvas/object-manager'
import ImageProcessor from '../../../processor/image-processor'

export default class ImageProcessorFactory extends ObjectManager<IImageProcessor> {
  /**
   * Constructor
   *
   * @param {IPixel[]} pixels
   * @param {number}   width
   * @param {number}   height
   */
  constructor(
    public pixels: IPixel[],
    width: number,
    height: number,
  ) {
    super(width, height)
  }

  /**
   * @inheritdoc
   */
  public create(): IImageProcessor {
    return new ImageProcessor(this.context, this.pixels)
  }
}
