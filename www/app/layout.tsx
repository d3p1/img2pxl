/**
 * @description Layout
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import React from 'react'
import type {Metadata} from 'next'
import {Audiowide} from 'next/font/google'
import './globals.css'

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
      <body className={`${audiowide.className} antialiased`}>{children}</body>
    </html>
  )
}
