import { UserButton } from "@clerk/nextjs";

export default function DashboardNavbar() {

    return (
        <nav id="dashboard-navbar" className="w-full h-14 border-b-[1px] border-neutral-200 flex flex-col justify-center">
            <div className="my-auto mx-4 flex flex-row justify-between items-center">
                <div id="branding">
                    <h1 className="font-black">Pawsense</h1>
                </div>
                <div id="right-menu">
                    <ul>
                        
                    </ul>
                    <UserButton afterSignOutUrl="/" />
                </div>    
            </div>                
        </nav>
    )
}