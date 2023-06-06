import './globals.css'
import { Outfit } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs';
const outfit = Outfit({ style: 'normal', subsets: ['latin']});
import DashboardNavbar from '@/components/nav/DashboardNavbar';
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
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
        <html lang="en">
          <body className={outfit.className}>
          <DashboardNavbar /> 
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
              {children}
            </main>   
          </body>
        </html>
    </ClerkProvider>
  )
}