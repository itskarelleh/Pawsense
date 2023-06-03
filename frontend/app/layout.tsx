import './globals.css'
import { Outfit } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs';
const outfit = Outfit({ style: 'normal', subsets: ['latin']});
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
          <body className={outfit.className}>
            {children}
          </body>
        </html>
    </ClerkProvider>
  )
}