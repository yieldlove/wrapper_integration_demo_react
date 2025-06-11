"use client";
import { Inter } from 'next/font/google'
import './globals.css'
import Link from 'next/link'
import Script from "next/script";

const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className={inter.className}>
      {/* Add Yieldlove script */}
      <Script src="https://cdn-a.yieldlove.com/v2/yieldlove.js?yieldlove.es" async/>
      {/* Add Google Tag Services script */}
      <Script src="https://securepubads.g.doubleclick.net/tag/js/gpt.js" async/>
      <nav style={{ padding: '20px'}}>
          <Link href="/" style={{ marginRight: '20px',color:"black", height:'10px',backgroundColor:"lightblue",borderRadius:"5px",textAlign: "center",
              padding: "13px 16px" }}>Home</Link>
          <Link href="/testPage" style={{color:"black", height:'10px',backgroundColor:"lightblue",borderRadius:"5px",textAlign: "center",
              padding: "13px 16px" }}>Test Page</Link>
      </nav>
      {children}
      </body>
    </html>
  )
}
