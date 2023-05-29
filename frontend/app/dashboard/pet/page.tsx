import { fakePets } from "@/data"
import { useRouter } from "next/router"


function getPetById(id : string) {
    const res = fakePets.map((pet) => pet.id === id);

    return res;
}

export default function Pet({ params } : { params: { id: string }}) {
 
    console.log(params);
 
    const data = getPetById(params.id);
    
    console.log(data);

    return (
        <>
            <header className="flex flex-col md:flex-row">
                <figure>
                    {/* <img src={} /> */}
                </figure>
                {/* <h1>{data.name}</h1> */}
            </header>
        </>
    )
}

