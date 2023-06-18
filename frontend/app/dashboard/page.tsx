import AddNewPetModal from "@/components/dashboard/AddNewPetModal";
import DashboardSection from '@/components/DashboardSection';
import { auth } from '@clerk/nextjs';
import { NextResponse } from "next/server";
import PetList from "@/components/pets/PetList";



export default async function Dashboard() {

    return (
        <>
            <DashboardSection title="Pets" actions={<AddNewPetModal />}>
                <PetList />
            </DashboardSection>
            <DashboardSection title="Events" actions={<></>}>
            </DashboardSection>
        </>
    )
}
