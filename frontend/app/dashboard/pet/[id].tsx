import { fakePets } from "@/data"

export default function Pet() {

    return (
        <>
            <header className="flex flex-col md:flex-row">
                <figure>
                    <img src={} />
                </figure>
            </header>
        </>
    )
}

export async function generateStaticParams() {

    const pets = fakePets;

    return pets.map((pet) => ({
        id: pet.id,
    }))
}