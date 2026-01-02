/**
 * @description Component
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import type {Img2PxlProps} from '../types'
import useImg2Pxl from '../hooks/useImg2Pxl.js'

export default function Img2Pxl(props: Img2PxlProps) {
  useImg2Pxl(props)
  return <div id="img2pxl"></div>
}
