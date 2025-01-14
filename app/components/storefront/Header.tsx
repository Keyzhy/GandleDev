import Link from "next/link";

import MobileNav from "./MobileNav";
import MainNav  from "./MainNav";

export default function Header() {
  return (
    <header className="">
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
