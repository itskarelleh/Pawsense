import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
    <section className="relative flex flex-row items-center h-screen">
      <div className="p-16">
        <SignIn />
      </div>
      <Image width={640} height={480} 
      alt="an image of a young girl sitting outside on the ground while she hugs a dog"
      className="w-full top-0 absolute -z-10" src="/sign-in-bg.jpg" unoptimized/>
    </section>
  )
}