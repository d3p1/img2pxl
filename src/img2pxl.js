/**
 * @description img2pxl.js
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
function lerp(a, b, t) {
  return a + (b - a) * t
}

function createParticlesFromImageData(imageData) {
  let particles = []
  const data = imageData.data
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] > 0 && !(i % 5)) {
      const x = Math.floor((i % (imageData.width * 4)) / 4)
      const y = Math.floor(i / (imageData.width * 4))

      particles.push({
        originX: x,
        originY: y,
        x: x,
        y: y,
        r: data[i],
        g: data[i + 1],
        b: data[i + 2],
      })
    }
  }

  return particles
}

const canvas = document.createElement('canvas')
document.body.appendChild(canvas)

const ctx = canvas.getContext('2d')

let imageData
let particles = []
const img = new Image()
img.src = 'logo.png'
img.onload = () => {
  canvas.width = img.width
  canvas.height = img.height
  ctx.drawImage(img, 0, 0)
  imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  particles = createParticlesFromImageData(imageData)
  update()
}

let mouseX = 0
let mouseY = 0
const radiusSquared = 400
canvas.addEventListener('mousemove', (event) => {
  mouseX = event.offsetX
  mouseY = event.offsetY
  for (const particle of particles) {
    const xDistance = particle.x - mouseX
    const yDistance = particle.y - mouseY
    const distanceSquared = xDistance ** 2 + yDistance ** 2

    if (distanceSquared <= radiusSquared) {
      particle.offsetX = mouseX
      particle.offsetY = mouseY
      particle.distanceX = xDistance
      particle.distanceY = yDistance
      particle.x = Math.ceil(particle.distanceX * 1.1) + particle.offsetX
      particle.y = Math.ceil(particle.distanceY * 1.1) + particle.offsetY
    } else {
      const now = new Date().getTime()
      const sec = now / 1000
      const t = sec - Math.floor(sec)
      particle.x = lerp(particle.x, particle.originX, t)
      particle.y = lerp(particle.y, particle.originY, t)
    }
  }

  update()
})

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  for (const particle of particles) {
    ctx.fillStyle = `rgb(${particle.r}, ${particle.g}, ${particle.b})`
    ctx.fillRect(particle.x, particle.y, 1, 1)
  }
}
