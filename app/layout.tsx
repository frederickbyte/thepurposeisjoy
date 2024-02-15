import './globals.css';
import Footer from '@/app/components/footer';
import localFont from 'next/font/local';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata = {
  title: {
    default: 'The Purpose Is Joy',
    template: '%s',
  },
  description: 'The purpose of life is to be happy.',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    shortcut: '/favicon.ico',
  },
}

const inter = localFont({
  src: [
    {
      path: '../public/fonts/Inter-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Inter-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/Inter-ExtraBold.woff2',
      weight: '800',
      style: 'italic',
    },
    {
      path: '../public/fonts/Inter-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../public/fonts/Inter-BoldItalic.woff2',
      weight: '700',
      style: 'italic',
    },
    {
      path: '../public/fonts/Inter-ExtraBoldItalic.woff2',
      weight: '800',
      style: 'italic',
    }
  ]
})

export default function RootLayout({ children }: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={'flex flex-col flex-1 h-full smooth-scroll p-0 m-0 border-0 ' + inter.className}>
      <body className='antialiased flex flex-col flex-1 text-base font-sansSerif text-defaultText max-w-2xl mx-4 mt-8 md:mt-20 md:text-lg lg:mt-32 lg:mx-auto'>
        <main className='flex flex-col flex-1'>
          {children}
          <SpeedInsights />
        </main>
        <Footer />
      </body>
    </html>
  )
}