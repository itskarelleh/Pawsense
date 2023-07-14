import { auth } from "@clerk/nextjs";

export async function uploadImage(file: any) {

    console.log("uploadImage values: " + file);
    if (file === undefined || file === '' || file === null) return null;

    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", `${process.env.NEXT_PUBLIC_UPLOAD_PRESET}`);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: formData
    });

    const data = await res.json();

    return data;
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

export async function getAssetByPublicId(publicId : string) {
    const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/fetch/public_id/${publicId}`;
    const response = await fetch(url, {
        method: "GET"
    });
  
    if (response.status === 200) {
      return await response.json();
    } else {
      throw new Error(`Error fetching asset: ${response.status}`);
    }
}