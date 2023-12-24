import Image from 'next/image'
import { UserButton } from "@clerk/nextjs";
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className="">
      <h1>hi from Dropbox, AKA Home</h1>
      <Button variant={"outline"}>Log in</Button>
      <UserButton afterSignOutUrl="/"/>
    </main>
  )
}
