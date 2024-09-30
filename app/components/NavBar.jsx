import Link from "next/link";
import React from "react";

const NavBar = () => {
  return (
    <nav className="flex justify-between items-center px-5 bg-slate-800 py-3">
      <Link className="text-white font-bold" href="/">Home</Link>
      <Link className=" text-white px-2 bg-slate-700  hover:bg-white hover:text-black rounded-lg" href="/add-topic">Create</Link>
    </nav>
  );
};

export default NavBar;
