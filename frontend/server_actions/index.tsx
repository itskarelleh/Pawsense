'use server'
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { uploadImage } from '@/functions';

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
    
    if(!res.ok) throw new Error('Failed to fetch data');
    
    return data;
}

export async function editPet(data : Object) {

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