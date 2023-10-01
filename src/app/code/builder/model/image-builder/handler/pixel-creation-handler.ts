/**
 * @description Pixel creation handler
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 * @note        The main purpose of this entity is to act as a middleware
 *              in the pixel creation logic (i.e.: add a factory entity to
 *              create the pixel and/or allow the customization of the pixel
 *              color, velocity, etc.)
 */
import {Color, IPixel} from '../../../../core/api/data/particle/pixel'
import Pixel from '../../../../core/model/particle/pixel'
import IPixelCreationHandler from '../../../api/image-builder/handler/pixel-creation-handler'

export default class PixelCreationHandler implements IPixelCreationHandler {
  /**
   * @inheritdoc
   */
  initPixel(size: number, color: Color, x: number, y: number): IPixel {
    return new Pixel(size, color, 0, 0, x, y)
  }
}
