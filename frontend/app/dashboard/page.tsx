import AddNewPetModal from "@/components/dashboard/AddNewPetModal";
import DashboardSection from '@/components/DashboardSection';
import PetList from "@/components/pets/PetList";
import AddNewEventModal from "@/components/dashboard/AddNewEventModal";

export default async function Dashboard() {

    return (
        <div className="grid grid-cols-1 gap-8">
            <DashboardSection title="Pets" actions={<AddNewPetModal />}>
                <PetList />
            </DashboardSection>
            {/* <DashboardSection title="Events" actions={<AddNewEventModal />}>
            </DashboardSection> */}
        </div>
    )
}
