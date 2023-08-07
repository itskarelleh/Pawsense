import { useState } from 'react';
import Modal from '../Modal';
import { PetBio } from ".";
import { Formik, Field, FormikValues } from 'formik';
import { EditPencil } from 'iconoir-react';
import ListboxField from '../ListboxField';
import { ActionButton } from '../inputs';

interface EditPetBioModalProps {
    title: string;
    bio: PetBio;
    handleSubmit: void | Promise<any>;
}

interface PetAboutInitialValues {
    weight: number;
    size: string;
    about: string;
    birthDate: Date | string | null;
    adoptionDate: Date | string | null;
    isFosterPet: boolean;
    traits: string[];
    photoIds: string[];
}

export default function EditPetBioModal({ title, bio, handleSubmit }: EditPetBioModalProps) {
    const { weight, size, about, birthDate, adoptionDate, isFosterPet } = bio;
    const [isEditing, setIsEditing] = useState<boolean>(true);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const sizes: string[] = ["extra-small", "small", "average", "large", "extra-large"];

    const toggleEditing = () => setIsEditing(prev => !prev);

    const initialValues: PetAboutInitialValues = {
        weight: weight || 0.00,
        size: size || '',
        about: about || '',
        birthDate: birthDate || null,
        adoptionDate: adoptionDate || null,
        isFosterPet: isFosterPet || false,
        traits: [],
        photoIds: []
    };

    // Track the form's dirty state
    const [isFormDirty, setIsFormDirty] = useState<boolean>(false);

    const handleFormChange = (values: FormikValues) => {
        setIsFormDirty(true);
    };

    const handleCancel = () => {
        // Check if there are changed fields
        if (isFormDirty) {
            setIsOpen(true); // Open the child Modal
        } else {
            setIsEditing(false); // Close the parent Modal
        }
    };

    return (
        <>
            <ActionButton onClick={toggleEditing} title={`Edit details about ${name}`}>
                <EditPencil className='m-auto' />
            </ActionButton>
            <Modal title={title} isOpen={isEditing} closeModal={() => setIsEditing(false)}>
                <Formik initialValues={initialValues} onSubmit={handleSubmit} onChange={handleFormChange}>
                    {props => (
                        <form className='h-full w-full' onSubmit={props.handleSubmit}>
                            <div>
                                <div>
                                    <label>
                                        Biography:
                                        <Field
                                            as="textarea"
                                            name="description"
                                            rows={5}
                                            className="" />
                                    </label>
                                </div>
                                <div className="flex flex-row justify-between space-x-2">
                                    <label>Adopted at:
                                        <Field
                                            type="date"
                                            id="adoptionDate"
                                            name="adoptionDate"
                                            className="w-full input outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                    </label>
                                    <label>Birthday:
                                        <Field
                                            type="date"
                                            id="birthDate"
                                            name="birthDate"
                                            className="w-full input outline-none focus:border-[#6A64F1] focus:shadow-md" />
                                    </label>
                                </div>
                                <div className="grid grid-cols-2">
                                    <label>Weight(lbs):
                                        <Field type="number" 
                                        defaultValue={weight ? weight : 0.00}
                                            min="0.00" max="99.99"
                                            name="weight"
                                            id="weight"
                                            className="w-full input border focus:border-[#6A64F1] focus:shadow-md" />
                                    </label>
                                    <label>Size:
                                        <ListboxField type="size" options={sizes} label="Size" />
                                    </label>
                                </div>
                            </div>

                            <div>
                                <button className="button rounded-r-none bg-green-400 hover:bg-neutral-800">
                                    Save
                                </button>
                                <button onClick={handleCancel} className="button rounded-l-none bg-red-400 hover:bg-neutral-800">
                                    Cancel
                                </button>
                            </div>
                        </form>
                    )}
                </Formik>
                <Modal isOpen={isOpen} closeModal={() => setIsOpen(false)} title="Cancel changes?">
                    <div className="flex flex-row">
                        <button className="bg-green-600 hover:bg-neutral-800">Yes</button>
                        <button onClick={() => setIsOpen(false)} className="bg-red-600 hover:bg-neutral-800">No</button>
                    </div>
                </Modal>
            </Modal>
        </>
    );
}
