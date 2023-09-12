import './globals.css'
import 'react-toastify/dist/ReactToastify.css';
import { ClerkProvider } from '@clerk/nextjs';
import { ToastContainer } from 'react-toastify';
import { nunito, nunito_sans } from './fonts';
import Navbar from "@/components/nav/Navbar";

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
        <html lang="en" className={nunito.className}>
          <ToastContainer />
          <body className={`min-h-screen`}>
            <Navbar />
            <main>
              {children}
            </main>   
          </body>
        </html>
    </ClerkProvider>
  )
}