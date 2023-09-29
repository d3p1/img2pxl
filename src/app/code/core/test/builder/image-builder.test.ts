/**
 * @description Image builder unit test
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import ImageBuilderFactory from '../helper/builder/image-builder-factory'
import ImageBuilder from '../../builder/image-builder'

/**
 * @note Init data set to test image build with different situations
 */
type DataSet = {
  pixelSize: number
  width: number
  height: number
  numPixels: number
}
const dataSet: DataSet[] = [
  {pixelSize: 1, width: 100, height: 100, numPixels: 10000},
  {pixelSize: 2, width: 100, height: 100, numPixels: 2500},
  {pixelSize: 2, width: 1, height: 1, numPixels: 1},
]

/**
 * @note Execute test suite for the data set
 * @note It is considered that the image and canvas
 *       have the same dimensions (width and height)
 *       and that the dimensions cannot be 0
 */
describe.each(dataSet)(
  'Image Builder (' +
    'pixelSize: $pixelSize - ' +
    'width: $width - ' +
    'height: $height - ' +
    'numPixels: $numPixels' +
    ')',
  ({pixelSize, width, height, numPixels}) => {
    let imageBuilderFactory: ImageBuilderFactory
    let imageBuilder: ImageBuilder

    beforeEach(() => {
      imageBuilderFactory = new ImageBuilderFactory(pixelSize, width, height)
      imageBuilder = imageBuilderFactory.create()
    })

    it('Build image: Draw image on canvas and init pixels', () => {
      const pixels = imageBuilder.build()
      const context = imageBuilderFactory.canvas.getContext('2d')
      const imageData = context?.getImageData(0, 0, width, height)
      expect(context?.drawImage).toHaveBeenCalledTimes(1)
      expect(pixels.length).toBe(numPixels)
      expect(pixels[0].color).toEqual([
        imageData?.data[0],
        imageData?.data[1],
        imageData?.data[2],
        imageData?.data[3],
      ])
    })
  },
)
