"use client"
import { useState } from 'react'
import { FormikValues } from 'formik';
import Modal from '../Modal';
import { useUser } from '@clerk/nextjs';
import { ActionButton } from '../inputs';
import { addNewPet } from '@/server_actions';
import { uploadImage } from '../../utils';
import { toast } from 'react-toastify';
import CustomToast from '../CustomToast';
import { Plus } from 'iconoir-react';
import PetForm from './PetForm';

interface InitialValues {
  name: string;
  type: string;
  breed: string;
  color: string;
  sex: string;
  avatar: any;
  userId: string | undefined;
}

export default function NewPetFormModal() {

    const [ isOpen, setIsOpen ] = useState(false);
    const { user } = useUser();

    const initialValues: InitialValues = {
      name: '',
      type: '',
      breed: '',
      color: '',
      sex: '',
      avatar: null,
      userId: user?.id
    }    
  
    function closeModal() {
      setIsOpen(prev => !prev);
    }
  
    function openModal() {
      setIsOpen(true)
    }
  
    async function handleSubmit(values: FormikValues | any) {
  
      const img = await uploadImage(values.avatar);
  
      const publicId = img.public_id;
  
      const body = { name: values.name, type: values.type,
        breed: values.breed, color: values.color, sex: values.sex, 
        avatar: publicId, userId: values.userId };
      
      console.log(body.userId);
      
      try {
        const newPet = await addNewPet(body);
  
        toast.success(
          <CustomToast>
            {newPet.name} has been added! <a href={`/pet/${newPet.id}`}>View new profile</a>
          </CustomToast>
        );
  
        closeModal();
      } catch (error) {
        toast.error("Failed to add new pet. Please try again.");
      }
  
    }

    return (
        <div>
      <div className="flex items-center justify-center">
        <ActionButton
          onClick={openModal}
        >
          <Plus />
        </ActionButton>
      </div>
      <Modal title="Add New Pet" userId={user?.id} isOpen={isOpen} openModal={openModal} closeModal={closeModal}>
        <PetForm onSubmitButtonLabel='Add New Pet' closeModal={closeModal} initialValues={initialValues} onSubmit={handleSubmit} />
      </Modal>
    </div>
    )
}

