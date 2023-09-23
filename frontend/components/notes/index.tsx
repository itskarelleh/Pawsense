"use client"
import { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { Field, Formik, FormikValues } from 'formik';
import PetCombobox from '../pets/PetCombobox';
import { Pet } from '../pets';
import { ActionButton } from '../inputs';
import { Plus } from 'iconoir-react';
import Modal from '../Modal';
import CustomToast from '../CustomToast';
import { toast } from 'react-toastify';
import { addNewNote} from '@/server_actions';

export interface Note {
    id: string | number | null,
    title: string,
    details: string,
    userId: string | number | null,
    petId: string | number | null
}

interface InitialValues {
    title: string;
    details: string;
    userId: string | undefined;
    petId: string | number | undefined;
}

export function AddNewNoteModal({ pet } : { pet : Pet }) {

    const { user } = useUser();
    const [ isOpen, setIsOpen ] = useState(false);

    const initialValues: InitialValues = {
        title: '',
        details: '',
        userId: user?.id,
        petId: pet?.id,
    }

    const closeModal = () => setIsOpen(false);

    async function handleSubmit(values: FormikValues | any) {
        const note = await addNewNote(values);

        if(note) {
            toast.success(
                <CustomToast>
                  New note added successfully
                </CustomToast>
              );
              
              closeModal();
        } else {
            toast.error(
                <CustomToast>
                  Something went wrong! Please try again.
                </CustomToast>
            );

            console.log(note);
        }
    }

    return (
        <>
            <ActionButton onClick={() => setIsOpen(prev => !prev)}>
                <Plus />
            </ActionButton>
            <Modal title={`Add Note About ${pet.name}`} isOpen={isOpen} closeModal={() => setIsOpen(prev => !prev)}>
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                    {props => (
                        <form  onSubmit={props.handleSubmit} 
                        className="flex flex-col space-y-4">
                            <label className=''>
                                <Field className="input-text" name="title" type="text" placeholder="Title" />
                            </label>
                            <label className=''>
                            Details
                            <Field name="details" as="textarea" rows={5} />
                        </label>
                        <button type="submit" className="button self-end">Add</button>
                    </form>
                    )}
                </Formik>
            </Modal>
        </>
    )
}

export function NoteSummary({ note } : { note : Note }) {

    return (
        <div className='summary-outer-container'>
            <div className="summary-inner-container">
                <div className="mb-4">
                    <h3>Name: {note.title}</h3>
                    
                    {note.details && <button className="hover">Details</button>}
                </div>
            </div>
        </div>
    )
}

export function NotesList({ notes } : { notes: Note[] }) {

    return (
        <div>
            {notes && notes.map((note : Note) => (
                <NoteSummary note={note} key={note.id} />
            ))}
        </div>
    )
}