/**
 * @description Lib
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import {config} from '../../etc/config.js'
import {useImg2Pxl} from '@d3p1/img2pxl/react'

export default function Lib() {
  useImg2Pxl(config)
  return (
    <div
      id="img2pxl"
      className="bg-primary-600 rounded-2xl inset-shadow-[0_0_0.3rem_black]"
    ></div>
  )
}
