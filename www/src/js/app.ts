/**
 * @description App
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import Img2Pxl from '@d3p1/img2pxl'

const app = new Img2Pxl('/img2pxl/media/images/logo.png', 280, 280, 64, 64, 3)
app.render()

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    app.dispose()
  }
})
