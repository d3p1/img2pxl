/**
 * @description Library component
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
'use client'

import {useEffect} from 'react'
import Img2Pxl from '@d3p1/img2pxl'

export default function Img2pxl() {
  useEffect(() => {
    new Img2Pxl({
      images: {
        0: {
          src: '/img2pxl/media/images/lib/emoji.png',
          width: 280,
          height: 280,
          resolution: {
            width: 280 * 0.25,
            height: 280 * 0.25,
          },
          pixel: {
            size: 3,
            motion: {
              displacement: {
                frequency: 1,
                amplitude: 40,
              },
            },
          },
          motion: {
            noise: {
              frequency: 0.1,
              amplitude: 5,
            },
          },
        },
        768: {
          src: '/img2pxl/media/images/lib/meisje-met-de-parel.png',
          width: 512 * 1.3,
          height: 600 * 1.3,
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
      },
      pointer: {
        size: 0.1,
      },
      containerSelector: '#img2pxl',
      isDebugging: true,
    })
  }, [])

  return <div id="img2pxl"></div>
}
