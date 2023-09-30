/**
 * @description Image builder interface
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import {IPixel} from '../../core/api/data/particle/pixel'

export default interface IImageBuilder {
  /**
   * Build image. Init pixels related to image
   *
   * @returns {IPixel[]}
   */
  build(): IPixel[]
}
