"use server"

export async function addNewPet(data : any) {
    "use server"

    //upload image 

    const body = {
      name: data.name,
      type: data.type
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_EXTERNAL_API}/api/v1/pets/add`, {
      body: data
    });
  
    if(!res.ok) throw new Error('Failed to fetch data');
  
    return res.json();
}
