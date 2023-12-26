
import Link from "next/link"
import { SignInButton, SignedOut, UserButton } from "@clerk/nextjs";
import { ThemeToggler } from "./ThemeToggler";

const Header = () => {
  return (
    <header className=" flex items-center justify-between p-2 ">
    <Link href="/" className="flex items-center">
        <h1 className=" font-bold text-lg">Dropbox</h1>
    </Link>

    <div className="flex items-center px-5 space-x-2">
      <ThemeToggler/>
        <UserButton afterSignOutUrl="/"/>

        {/* SignedOut is used to show something when the user is signed out */}
        <SignedOut>
            <SignInButton afterSignInUrl="/dashboard" mode="modal"/>
        </SignedOut>
    </div>
    </header>
  )
}

export default Header