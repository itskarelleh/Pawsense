"use client"
import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";

export default function PetAvatar() {
    const cld = new Cloudinary({ 
        cloud: {
            cloudName: 'dwvdml8mi'
        }
    });

    const img = cld.image('/samples/animals/kitten-playing');

    img.resize(thumbnail().width(150).height(150)).format('jpg');

    return (
        <div>
            <AdvancedImage cldImg={img} />
        </div>
    )
}