export interface Note {
    id: string | number;
    title: string;
    details: string;
}

export function NotesList({ notes } : { notes: Note[] }) {

    return (
        <div>
            {notes && notes.map((note : Note) => (
                <div key={note.id}>
                    {note.title}
                    {note.details}
                </div>
            ))}
        </div>
    )
}