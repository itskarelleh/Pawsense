import AddNewPetModal from "@/components/pets/AddNewPetModal";
import DashboardSection from '@/components/DashboardSection';
import { PetList } from "@/components/pets";
import AddNewEventModal from "@/components/events/AddNewEventModal";
import { getPets } from "@/server_actions";
import { AddNewMedicationModal } from "@/components/medications";
import { EventList } from "@/components/events";

export default async function Dashboard() {
    
    const pets : any = await getPets();
    const events : Event[] = [];
    
    return (
        <div className="p-12 grid grid-cols-1 md:grid-cols-2 gap-8 bg-neutral-100 min-h-screen">
            <DashboardSection title="Pets" actions={<AddNewPetModal />}>
                <PetList pets={pets} />
            </DashboardSection>
            <DashboardSection title="Events" actions={<AddNewEventModal pets={pets} />}>
                <EventList events={events} />
            </DashboardSection>
        </div>
    )
}
