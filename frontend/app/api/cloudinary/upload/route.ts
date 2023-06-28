import { NextResponse } from "next/server";

export async function POST(request : Request) {

    const { avatar } = await request.json();
    if(avatar === undefined || avatar === '' || avatar === null) return null;
    
    console.log("avatar: " + avatar);

    try {

        const formData = new FormData();
    
        formData.append("file", avatar);
        formData.append("upload_preset", `${process.env.NEXT_PUBLIC_UPLOAD_PRESET}`);
    
        const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
          method: "POST",
          body: formData
        });
              
        const data = await res.json();
    
        return NextResponse.json({ data });
    } catch (error) {
        console.error('Error uploading image:', error);
        return null;
    }
}