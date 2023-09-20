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
import { addNewMedication } from '@/server_actions';

export interface Medication {
    id: string | number | null,
    name: string,
    brand: string | null,
    instructions: string,
    userId: string | number | null,
    petId: string | number | null
}

interface InitialValues {
    name: string;
    brand: string | null;
    instructions: string;
    userId: string | undefined;
    petId: string | number | undefined;
}

function AddNewMedicationModal({ pet } : { pet : Pet }) {

    const { user } = useUser();
    const [ isOpen, setIsOpen ] = useState(false);

    const initialValues: InitialValues = {
        name: '',
        brand: '',
        instructions: '',
        userId: user?.id,
        petId: pet?.id,
    }

    const closeModal = () => setIsOpen(false);

    async function handleSubmit(values: FormikValues | any) {
        const medication = await addNewMedication(values);

        if(medication) {
            toast.success(
                <CustomToast>
                  New medication added!
                </CustomToast>
              );
              
              
              
              closeModal();
        } else {
            toast.error(
                <CustomToast>
                  Something went wrong! Please try again.
                </CustomToast>
            );

            console.log(medication);
        }

        
    }

    return (
        <>
            <ActionButton onClick={() => setIsOpen(prev => !prev)}>
                <Plus />
            </ActionButton>
            <Modal title={`Add new Medication for ${pet.name}`} isOpen={isOpen} closeModal={() => setIsOpen(prev => !prev)}>
                <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                    {props => (
                        <form  onSubmit={props.handleSubmit} 
                        className="flex flex-col space-y-4">
                        <div>
                            <label className=''>
                                Name
                                <Field className="input-text" name="name" type="text" />
                            </label>
                            <label>
                                Brand (optional)
                                <Field className="input-text" name="brand" type="text" />
                            </label>
                        </div>
                        <label className=''>
                            Instructions
                            <Field name="instructions" as="textarea" rows={5} />
                        </label>
                        <button type="submit" className="button self-end">Add</button>
                    </form>
                    )}
                </Formik>
            </Modal>
        </>
    )
}

function MedicationSummary({ medication } : { medication : Medication }) {

    const [ isOpen, setIsOpen ] = useState<boolean>(false);
    return (
        <>
            <div className='rounded-full w-full'>
                <div className="flex flex-col justify-between p-4 w-5/6 mx-auto">
                    <div className="mb-4">
                        <h3 className="text-lg md:text-xl font-bold">{medication.name}</h3>
                        {medication.brand && <p className="text-sm">{medication.brand}</p>}
                    </div>
                    {medication.instructions && <button
                                                        onClick={() => setIsOpen(true)} className="self-start font-bold hover:text-sky-500 transition-all ease-in-out">Instructions</button>}
                </div>
            </div>
            {medication.instructions && (
                <Modal title={`Using ${medication.name}`} isOpen={isOpen} closeModal={() => setIsOpen(prev => !prev)}>
                    <p>{medication.instructions}</p>
                </Modal>
            ) }
        </>
    )
}

export { AddNewMedicationModal, MedicationSummary }