import './styles/cubeField.css'
import './styles/HomeStyles.css'
import './styles/Variables.css'

import { Merriweather } from 'next/font/google'
import { Merriweather_Sans } from 'next/font/google'

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-merriweather',
})

const merriweatherSans = Merriweather_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-merriweather-sans',
})

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${merriweather.variable} ${merriweatherSans.variable}`}>
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
