'use server'
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { uploadImage } from '@/functions';


//get requests
export async function getPets() {
  const { userId, getToken } = auth();

  if (!userId) NextResponse.redirect("/sign-in");

  const token = await getToken();

  const res = await fetch(
      `${process.env.NEXT_PUBLIC_EXTERNAL_API}/api/v1/pets/current-user/${userId}`,
      {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
      }
  );

  const data = await res.json();

  return data;
}

export async function getPetById(petId : string) {
  const { userId, getToken } = auth();

  if (!userId) NextResponse.redirect("/sign-in");

  const token = await getToken();

  const res = await fetch(
      `${process.env.NEXT_PUBLIC_EXTERNAL_API}/api/v1/pets/${petId}`,
      {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
      }
  );

  const data = await res.json();
  const pet = data;

  return pet;
}

export async function getPetDetails(petId : string) {
    const { getToken } = auth();

    const token = await getToken();

    const res = await fetch(`${process.env.NEXT_PUBLIC_EXTERNAL_API}/api/v1/pets/details/${petId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}`}
    })

    const data = await res.json();

    return data;

}

export async function getAllMedicationsForPet(petId : string) {
    return [];
}

export async function getAllEventsForCurrentUser() {
    const { userId, getToken } = auth();

    const token = await getToken();

    const res = await fetch(`${process.env.NEXT_PUBLIC_EXTERNAL_API}/api/v1/events/current-user/${userId}`, {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` }
    });

    const data = await res.json();

    return data;
}

export async function getAllEventsForPet(petId : string) {

}

//post methods
export async function addNewPet( values : any ) {

    const { getToken } = auth();

    const token = await getToken();

    const res = await fetch(`${process.env.NEXT_PUBLIC_EXTERNAL_API}/api/v1/pets/add`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(values)
    });

    const data = await res.json();

    console.log(res.status);
    
    if(!res.ok) {
        throw new Error('There was a problem adding the pet. Please try again.');
    }
    
    return data;
}

export async function addNewMedication(values : any) {
    const { getToken } = auth();

    const token = await getToken();

    const res = await fetch(`${process.env.NEXT_PUBLIC_EXTERNAL_API}/api/v1/medications/add`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(values)
    });

    if(!res.ok) throw new Error('Failed to fetch data');
    const data = await res.json();

    return data;

}

export async function addNewEvent(values : any) {
    const { getToken } = auth();

    const token = await getToken();

    const response = await fetch(`${process.env.NEXT_PUBLIC_EXTERNAL_API}/api/v1/events/add`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(values)
    });

    if(!response.ok) throw new Error('Failed to fetch data');
    
    const data = await response.json();

    return data;
}


//put/patch methods
export async function updatePetBio(data : Object) {

    const { getToken } = auth();

    const token = await getToken();

    const res = await fetch(`${process.env.NEXT_PUBLIC_EXTERNAL_API}/api/v1/pets/add`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data) 
    });

    const d = await res.json();

    return d;

}


//delete methods
export async function deletePet(petId : string) {
    
    const { getToken } = auth();

    const token = await getToken();

    const res = await fetch(`${process.env.NEXT_PUBLIC_EXTERNAL_API}/api/v1/pets/delete/${petId}`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
    });

    const d = await res.json();

    return d;

}