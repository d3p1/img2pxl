/**
 * @description Pixel unit test
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import Pixel from '../../model/particle/pixel'

/**
 * @note The pixel is not able to check canvas edges and
 *       canvas coordinate system origin (0,0) location (i.e.: when the origin
 *       of the coordinate system is translated),
 *       so it cannot check if it is outside the canvas or if a negative
 *       coordinate value is invalid. There will be an other entity that
 *       will check these situations
 */
describe('Pixel', () => {
  it('Update pixel with positive x and y velocity', () => {
    const pixel = new Pixel(10, [255, 0, 0, 0], 1, 1, 0, 0)
    pixel.update()
    expect(pixel.x).toBe(1)
    expect(pixel.y).toBe(1)
  })

  it('Update pixel with negative x and y velocity', () => {
    const pixel = new Pixel(10, [255, 0, 0, 0], -1, -1, 0, 0)
    pixel.update()
    expect(pixel.x).toBe(-1)
    expect(pixel.y).toBe(-1)
  })
})
