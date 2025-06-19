/**
 * @description Layout
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import React from 'react'
import type {Metadata} from 'next'
import {Audiowide} from 'next/font/google'
import './css/globals.css'
import Logo from '@/app/component/Logo'

const audiowide = Audiowide({
  subsets: ['latin'],
  weight: '400',
})

export const metadata: Metadata = {
  title: 'img2pxl',
  description: 'img2pxl',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${audiowide.className} antialiased w-screen h-screen overflow-hidden grid grid-cols-10 grid-rows-1 place-items-center bg-primary-800`}
      >
        <header className="col-start-1 col-span-2 px-4">
          <Logo />
        </header>
        <main className="relative w-full h-11/12 col-start-3 col-end-10 bg-primary-600 rounded-xl inset-shadow-[0_0_0.3rem_black]">
          {children}
        </main>
      </body>
    </html>
  )
}
