"use server"
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

export async function getPets() {
  'use server'

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
  const pets = data;

  console.log(pets);

  return pets;
}

export async function getPetById(petId : string) {
  'use server'

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

// export async function uploadToCloudinary(file : File) {
    // "user server"

// };

export async function addNewPet( data : any ) {
    "use server"

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
    
    if(!res.ok) throw new Error('Failed to fetch data');
    
    return d;
    // return await res.json();
}
