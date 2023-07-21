import PetAvatar from "../PetAvatar"
import { Pet } from "../pets"
import { H3 } from "../typography"

export interface Event {
    id: number | string,
    title: string,
    description: string,
    type: string,
    startsAt: Date,
    endsAt: Date,
    attendees: Pet[],
    userId: string,
    createdAt: Date,
    lastModifiedAt: Date 
}


function EventSummary({ event } : { event : Event }) {
    return (
        <div>
            {event.title}
            {event.type}
        </div>
    )
}

function EventDetails() {

    return (
        <></>
    )
}

/**
 * 
 * @returns a list of all the events for the current user
 */
async function EventList({ events } : { events : Event[] }) {
    
    if(events.length === 0) {
        return (
            <div className="w-full h-36 flex flex-col items-center justify-center">
                <H3>No upcoming events</H3>
            </div>
        )
    }

    return (
        <>
            {events && events.map((event : Event) => {
                <>
                
                </>
            })}
        </>
        )
}

export { EventList, EventSummary, EventDetails }