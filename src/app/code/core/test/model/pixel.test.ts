/**
 * @description Pixel unit test
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import {Point} from '../../api/data/particle'
import {IPixel} from '../../api/data/particle/pixel'
import Pixel from '../../model/particle/pixel'

/**
 * @note Init data set
 */
type DataSet = Array<
  Omit<IPixel, 'update' | 'checkAndHandleCollision'> & {
    updatedX: number
    updatedY: number
    collisionData: Point & {
      isExpectedCollision: boolean
    }
  }
>
const dataSet: DataSet = [
  {
    size: 10,
    color: [255, 0, 0, 0],
    vx: 1,
    vy: 1,
    x: 0,
    y: 0,
    updatedX: 1,
    updatedY: 1,
    collisionData: {
      x: 1,
      y: 1,
      isExpectedCollision: true,
    },
  },
  {
    size: 10,
    color: [255, 0, 0, 0],
    vx: -1,
    vy: -1,
    x: 0,
    y: 0,
    updatedX: -1,
    updatedY: -1,
    collisionData: {
      x: 0,
      y: 0,
      isExpectedCollision: false,
    },
  },
]

describe.each(dataSet)(
  'Pixel (' +
    'size: $size -' +
    'color: $color -' +
    'vx: $vx -' +
    'vy: $vy -' +
    'x: $x -' +
    'y: $y -' +
    'updatedX: $updatedX -' +
    'updatedY: $updatedY -' +
    'collisionData.x: $collisionData.x -' +
    'collisionData.y: $collisionData.y -' +
    'collisionData.isExpectedCollision: $collisionData.isExpectedCollision' +
    ')',
  ({size, color, vx, vy, x, y, updatedX, updatedY, collisionData}) => {
    let pixel: IPixel

    beforeEach(() => {
      pixel = new Pixel(size, color, vx, vy, x, y)
    })

    it('Update pixel: move pixel coordinates taking velocity into account', () => {
      pixel.update()
      expect(pixel.x).toBe(updatedX)
      expect(pixel.y).toBe(updatedY)
    })

    it('Check and handle collision: execute callback if collision occur', () => {
      const callback = jest.fn()
      pixel.update()
      pixel.checkAndHandleCollision(
        {x: collisionData.x, y: collisionData.y},
        callback,
      )
      expect(callback).toHaveBeenCalledTimes(
        collisionData.isExpectedCollision ? 1 : 0,
      )
    })
  },
)
