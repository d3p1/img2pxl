/**
 * @description img2pxl.js
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import Pixel from './core/pixel.js'

export default class Img2Pxl {
  #pixels = []
  #canvas
  #ctx
  #mouseX
  #mouseY
  #isMouseMove = false

  constructor() {
    this.#canvas = document.createElement('canvas')
    document.body.appendChild(this.#canvas)

    this.#ctx = this.#canvas.getContext('2d')

    const img = new Image()
    img.src = 'logo.png'
    img.onload = () => {
      this.#canvas.width = img.width
      this.#canvas.height = img.height
      this.#ctx.drawImage(img, 0, 0)
      const imageData = this.#ctx.getImageData(
        0,
        0,
        this.#canvas.width,
        this.#canvas.height,
      )
      this.#createPixelsFromImageData(imageData)
    }

    requestAnimationFrame(this.animate.bind(this))

    this.#addMouseEvents()
  }

  animate(t) {
    const squareRadius = 400

    this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height)
    for (const pixel of this.#pixels) {
      if (this.#isMouseMove) {
        const xDistance = pixel.x - this.#mouseX
        const yDistance = pixel.y - this.#mouseY
        const squareDistance = xDistance ** 2 + yDistance ** 2

        if (squareDistance < squareRadius) {
          pixel.x += xDistance * 2
          pixel.y += yDistance * 2
        }
      }

      pixel.update(t)
      pixel.draw(this.#ctx)
    }
    requestAnimationFrame(this.animate.bind(this))
  }

  #addMouseEvents() {
    this.#canvas.addEventListener('mousemove', (e) => {
      this.#mouseX = e.offsetX
      this.#mouseY = e.offsetY
      this.#isMouseMove = true
    })

    this.#canvas.addEventListener('mouseout', () => {
      this.#isMouseMove = false
    })
  }

  #createPixelsFromImageData(imageData) {
    const data = imageData.data
    for (let i = 0; i < data.length; i += 4) {
      if (data[i + 3] > 0 && !(i % 5)) {
        const x = Math.floor((i % (imageData.width * 4)) / 4)
        const y = Math.floor(i / (imageData.width * 4))
        this.#pixels.push(new Pixel(x, y, data[i], data[i + 1], data[i + 2]))
      }
    }
  }
}

new Img2Pxl()
