import './globals.css'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs';
const inter = Inter({ subsets: ['latin'] })
import 'react-dropzone-uploader/dist/styles.css'
  
export const metadata = {
  title: 'Pawsense',
  description: 'Ensuring that your pets live their best lives',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          {children}
          </body>
      </html>
    </ClerkProvider>
  )
}
