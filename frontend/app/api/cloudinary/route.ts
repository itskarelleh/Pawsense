export async function POST(request : Request) {

    const { avatar } = await request.json();
    
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;

    try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', ' ');

        const response = await fetch(cloudinaryUrl, {
        method: 'POST',
        body: formData,
        });

        if (response.ok) {
        const data = await response.json();
        const imageUrl = data.secure_url;
        console.log('Uploaded image URL:', imageUrl);
        return imageUrl;
        } else {
        console.error('Failed to upload image');
        return null;
        }
    } catch (error) {
        console.error('Error uploading image:', error);
        return null;
    }
}