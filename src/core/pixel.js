import MathUtil from '../utils/math.js'

export default class Pixel {
  constructor(x, y, r, g, b) {
    this.x = x
    this.y = y
    this.originX = x
    this.originY = y
    this.r = r
    this.g = g
    this.b = b
    this.t = 0
  }

  draw(ctx) {
    ctx.save()
    ctx.fillStyle = `rgb(${this.r}, ${this.g}, ${this.b})`
    ctx.fillRect(this.x, this.y, 1, 1)
    ctx.restore()
  }

  update(t) {
    if (this.x === this.originX && this.y === this.originY) {
      this.t = 0
      return false
    }

    if (!this.t) {
      this.t = t
    }

    const elapsedTime = t - this.t
    this.x -= (this.x - this.originX) * (elapsedTime / 10000)
    this.y -= (this.y - this.originY) * (elapsedTime / 10000)

    return true
  }
}
