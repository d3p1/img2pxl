/**
 * @description Pixel creation handler unit test
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import Pixel from '../../../../../core/model/particle/pixel'
import PixelCreationHandler from '../../../../model/image-builder/handler/pixel-creation-handler'

describe('Pixel Creation Handler', () => {
  let pixelCreationHandler: PixelCreationHandler

  beforeEach(() => {
    pixelCreationHandler = new PixelCreationHandler()
  })

  it('init pixel: create pixel', () => {
    const pixel = pixelCreationHandler.initPixel(
      1,
      [255, 255, 255, 255],
      0,
      0,
      0,
      0,
    )
    expect(pixel).toBeInstanceOf(Pixel)
  })
})
