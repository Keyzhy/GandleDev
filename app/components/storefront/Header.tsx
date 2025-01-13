import Link from "next/link";

import MobileNav from "./MobileNav";
import MainNav  from "./MainNav";

export default function Header() {
  return (
    <header className="relative top-2 w-full bg-white rounded-2xl shadow-lg p-4 mx-auto max-w-6xl">
        <div className="container flex items-center">
            {/*Desktop Navbar*/}
            <MainNav />

            {/*Mobile Navbar*/}
            <MobileNav />

            {/* Desktop & Mobile */}
            
        </div>
    </header>
  )
}
