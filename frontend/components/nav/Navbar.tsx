import { auth, UserButton } from "@clerk/nextjs"
import Link from "next/link";

export default function Navbar() {

    const { userId } = auth();

    return (
        <nav id="dashboard-navbar" className="w-full h-14 border-b-[1px] border-neutral-200 flex flex-col justify-center">
            <div className="my-auto mx-4 flex flex-row justify-between items-center">
                <div id="branding">
                    <a href="/">
                        <h1 className="font-black text-sm">Pawsense</h1>
                    </a>
                </div>
                <div id="right-menu">
                    <ul className="space-x-4 flex flex-row">
                       {userId ? <UserButton /> : 
                       <>
                        <li>
                            <Link className="hover:text-sky-600 transition-colors ease-in-out" href="/sign-in">Sign In</Link>
                        </li>
                        <li>
                            <Link href="/sign-up" className="button bg-violet-500">Sign Up</Link>
                        </li>
                       </>}
                    </ul>
                </div>    
            </div>                
        </nav>
    )
}