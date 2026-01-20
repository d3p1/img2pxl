/**
 * @description Logo component
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import Image from 'next/image'

export default function Logo() {
  return (
    <div className="logo">
      <Image
        src="/img2pxl/media/images/logo.png"
        width="112"
        height="427"
        alt="img2pxl"
      />
    </div>
  )
}
