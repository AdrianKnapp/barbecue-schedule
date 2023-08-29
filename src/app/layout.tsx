import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Raleway } from 'next/font/google'
import Image from 'next/image'

const raleway = Raleway({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={raleway.className}>
        <div className="relative flex flex-col w-[636px] min-h-[800px] mx-auto bg-primary shadow-lg mt-10">
          <div className="absolute top-0 left-0 gradient-mask-b-60 pointer-events-none">
            <Image src="/barbecue-pattern.svg" alt="background-pattern" className="w-full h-full" width={200} height={200} />
          </div>
          <h1 className='text-3xl font-bold text-center mt-20'>Agenda de Churras</h1>
          {children}
        </div>
      </body>
    </html>
  )
}
