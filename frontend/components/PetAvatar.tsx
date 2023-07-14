"use client"
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize";

export default function PetAvatar({ imgId, width, height, isRounded, format } 
    : { imgId : string, width: number | string, height: number | string, isRounded: boolean, format: string }) {
    
    const cld = new Cloudinary({ 
        cloud: {
            cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
        }
    });

    const img = cld.image(imgId);

    img.resize(fill().width(width).height(height))
    .quality(100)
    .format(format);

    return (
        <div className={`overflow-hidden ${isRounded ? `rounded-full` : null}`}>
            <AdvancedImage cldImg={img} />
        </div>
    )
}