import './globals.css'
import 'react-toastify/dist/ReactToastify.css';
import { Outfit } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs';
import { ToastContainer } from 'react-toastify';
import { nunito_sans } from './fonts';

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
          <ToastContainer />
          <body className={nunito_sans.className}>
            <main>
              {children}
            </main>   
          </body>
        </html>
    </ClerkProvider>
  )
}