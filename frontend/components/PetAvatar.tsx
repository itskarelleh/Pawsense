"use client"
import { useState } from 'react';
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { fill } from "@cloudinary/url-gen/actions/resize";
import {byRadius} from "@cloudinary/url-gen/actions/roundCorners";

export default function PetAvatar({ imgId, width, height, radius, format } 
    : { imgId : string, width: number | string, height: number | string, radius: number, format: string }) {
    
        const [ isEditing, setIsEditing ] = useState(false);

        const cld = new Cloudinary({ 
        cloud: {
            cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
        }
    });

    const img = cld.image(imgId);

    img.resize(fill().width(width).height(height))
    .roundCorners(byRadius(radius))
    .format(format);

    return (
        <div>
            {!isEditing && <AdvancedImage cldImg={img} />}
        </div>
    )
}