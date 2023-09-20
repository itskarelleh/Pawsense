import { Transformation, Cloudinary } from '@cloudinary/url-gen';

const cld = new Cloudinary({
    cloud: {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
    }
})

export async function updateImage(file : File, existingImageId : string) {
    if (!file) {
        return;
      }
  
      try {
        // Upload the new image
        const response = await cld.upload(file).toImage();
        return response.image().publicId();
  
        // Update the existing image's public ID in your database
        // Your database update logic goes here
  
      } catch (error) {
        console.error('Error updating image:', error);
      }

}

export async function uploadImage(file: any) {

    console.log("uploadImage values: " + file);
    if (file === undefined || file === '' || file === null) return null;

    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", `${process.env.NEXT_PUBLIC_UPLOAD_PRESET }`);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: formData
    });

    const data = await res.json();

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