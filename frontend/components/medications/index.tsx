"use client"
import { useUser } from '@clerk/nextjs';
import { Field, Formik, FormikValues } from 'formik';
import PetCombobox from '../pets/PetCombobox';

export interface Medication {
    name: string,
    brand: string | null,
    instructions: string,
}

interface InitialValues {
    name: string;
    instructions: string;
    userId: string | undefined;
}

function AddNewMedicationModal({ petId, pets } : { petId: string, pets: any }) {

    const { user } = useUser();

    const initialValues: InitialValues = {
        name: '',
        instructions: '',
        userId: user?.id
    }

    return (
        <Formik initialValues={initialValues} onSubmit={(values: FormikValues) => 
            {
                throw new Error('Function not implemented.');
            }
        }>
            <form>
                <label>
                    Perscription Name
                    <Field name="name" type="text" />
                </label>

                <label>
                    <Field name="instructions" as="textarea" rows={5} />
                </label>
                {petId.length === 0 && <PetCombobox pets={pets} />}
                </form>
        </Formik>
    )
}

export { AddNewMedicationModal }