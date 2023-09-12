import { UserButton } from "@clerk/nextjs";

export default function DashboardNavbar() {

    return (
        <nav id="dashboard-navbar" className="w-full h-14 border-b-[1px] border-neutral-200 flex flex-col justify-center">
            <div className="my-auto mx-4 flex flex-row justify-between items-center">
                <div id="branding">
                    <a href="/">
                        <h1 className="font-black text-sm">Pawsense</h1>
                    </a>
                </div>
                <div id="right-menu">
                    <ul>
                    <UserButton afterSignOutUrl="/" />
                    </ul>
                </div>    
            </div>                
        </nav>
    )
}