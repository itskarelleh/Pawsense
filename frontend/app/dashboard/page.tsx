import DashboardSection from '@/components/DashboardSection';
import { PetAvatar, PetList } from "@/components/pets";
import AddNewEventModal from "@/components/events/AddNewEventModal";
import { getAllEventsForCurrentUser, getPets } from "@/server_actions";
import { EventList } from "@/components/events";
import NewPetFormModal from "@/components/pets/NewPetFormModal";

export default async function Dashboard() {
    
    const pets : any = await getPets();
    const events : Event[] = await getAllEventsForCurrentUser();
    
    return (
        <div className="p-12 grid grid-cols-1 md:grid-cols-2 gap-8 bg-neutral-100 min-h-screen">
            <DashboardSection title="Pets" actions={<NewPetFormModal/>}>
                <PetList pets={pets} />
                {/* <PetAvatar imgId='/pets/m1uqpdumgk9swlfwnqe8' width="50" height="50" isRounded /> */}
            </DashboardSection>
            <DashboardSection title="Events" actions={<AddNewEventModal pets={pets} />}>
                <EventList events={events} />
            </DashboardSection>
        </div>
    )
}
