import { NextPage } from "next";
import Link from "next/link";
import { schoolName } from "../pages/_app";

type Props = {
  children: React.ReactNode;
};

const DashboardLayout: NextPage<Props> = ({ children }) => {
  return (
    <>
      <header className="h-32">
        <div className="sticky top-0 flex items-center justify-between gap-20 bg-yellow-500 px-24 py-4 font-poppins">
          <h1 className="select-none border-4 border-double border-orange-700 px-2 py-1 text-2xl font-bold uppercase">
            {schoolName}
          </h1>

          <nav className="flex flex-grow flex-row-reverse gap-12 text-sm font-semibold tracking-widest">
            <Link href="/about">Events</Link>
            <Link href="/about">News</Link>
            <Link href="/about">Contact</Link>
            <Link href="/about">About Us</Link>
          </nav>

          <button className="flex flex-col gap-1">
            <span className={hamburgerMenuBar}></span>
            <span className={hamburgerMenuBar}></span>
            <span className={hamburgerMenuBar}></span>
          </button>
        </div>
      </header>

      {children}
    </>
  );
};

export default DashboardLayout;

// ------------------------------ Styling ------------------------------
const hamburgerMenuBar = "block h-1 w-8 bg-black";
