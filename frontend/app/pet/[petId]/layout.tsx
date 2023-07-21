import DashboardNavbar from "@/components/nav/DashboardNavbar";

export default function PetLayout({ children } : { children : React.ReactNode }) {

    return (
        <>
            <DashboardNavbar />
            {children}
        </>
    )
}