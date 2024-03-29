import { Pet } from "../pets"

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
        <div className="summary-outer-container">

           <div className="summary-inner-container">
               <div className="flex flex-col-reverse">
                   <h3>
                       {event.title}
                   </h3>
                   <small>
                       {event.type}
                   </small>
               </div>
               <div>
                   {event.startsAt} {event.endsAt && ` to ${event.endsAt}`}
               </div>
           </div>
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
                No upcoming events
            </div>
        )
    }

    return (
        <>
            {events && events.map((event : Event) => {
                <>
                    <EventSummary key={event.id} event={event} />
                </>
            })}
        </>
        )
}

export { EventList, EventSummary, EventDetails }