import { UserButton, auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation';

export default function Home() {

  const { userId } = auth();

  if(userId) redirect('/dashboard');
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Pawsense</h1>
      {/* <UserButton afterSignOutUrl='/' /> */}
    </main>
  )
}
