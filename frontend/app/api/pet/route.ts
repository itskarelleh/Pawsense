import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default async function GET(request : Request) {

        const { petId } : any = request.body;
        const { userId, getToken } = auth();

        if (!userId) NextResponse.redirect("/sign-in");

        const token = await getToken();

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_EXTERNAL_API}/api/v1/pets/${petId}`,
            {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            }
        );

        const data = await res.json();
        const pet = data;

        return NextResponse.json(pet);
}