/**
 * @description Page
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
'use client'

import {useEffect} from 'react'
import Img2Pxl from '@d3p1/img2pxl'

export default function HomePage() {
  useEffect(() => {
    const app = new Img2Pxl({
      image: {
        src: '/img2pxl/media/images/logo.png',
        width: 280,
        height: 280,
        resolution: {
          width: 64,
          height: 64,
        },
        pixel: {
          size: 3,
        },
      },
      containerSelector: '#img2pxl',
    })

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        app.dispose()
      }
    })

    app.render()

    app.debug()
  }, [])

  return <div id="img2pxl"></div>
}
