/**
 * @description `img2pxl` component
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
'use client'

import {useEffect} from 'react'
import Img2Pxl from '@d3p1/img2pxl'

export default function Img2pxl() {
  useEffect(() => {
    const app = new Img2Pxl({
      image: {
        src: '/img2pxl/media/images/meisje-met-de-parel.png',
        width: 512 * 1.5,
        height: 600 * 1.5,
        resolution: {
          width: 512 * 0.5,
          height: 600 * 0.5,
        },
        pixel: {
          size: 2,
          motion: {
            displacement: {
              frequency: 1,
              amplitude: 40,
            },
          },
        },
        motion: {
          noise: {
            frequency: 0,
            amplitude: 0,
          },
        },
      },
      pointer: {
        size: 0.1,
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
