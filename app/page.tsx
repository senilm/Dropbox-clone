import Image from 'next/image'
import { UserButton } from "@clerk/nextjs";
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className=" h-[100vh] bg-[#1E1919]">
      <div className='flex flex-col lg:flex-row items-center bg-[#1E1919] dark:bg-slate-800'>
        {/* left side */}
        <div className=' p-10 flex flex-col bg-[#2B2929] dark:bg-slate-800 text-white space-y-5 rounded-lg'>
          <h1 className='text-5xl max-lg:text-3xl font-bold'>
          Welcome to Dropbox.<br/>
          <br/>
          Just Drag-n-Drop your files to share them.All in one place
          </h1>

          <Link href='/dashboard' className='flex bg-blue-500 p-5 w-fit cursor-pointer'>
            Try it for free!
            <ArrowRight className=' ml-8'/>
          </Link>
        </div>

        {/* Right side */}
        <div className=' bg-[#1E1919] dark:bg-slate-800 h-full p-10'>
          <video autoPlay loop muted className='rounded-lg'>
            <source src="https://aem.dropbox.com/cms/content/dam/dropbox/warp/en-us/overview/lp-header-graphite200-1920x1080-en_GB.mp4" type='video/mp4' />
            Your browser does not support the video tag
          </video>
        </div>
      </div>
    </main>
  )
}
