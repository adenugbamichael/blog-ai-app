import "./globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog AI App",
  description: "Blog built in Next JS that uses AI",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
