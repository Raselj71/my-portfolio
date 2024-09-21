"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from "next/navigation";
import { CgMenuRightAlt } from "react-icons/cg";
import { RxCross2 } from "react-icons/rx";

function Navbar() {
    const[open, setOpen]=useState(false);
      const pathname = usePathname();
  return (
    <header className="fixed top-0 left-0 w-full bg-[#020617] z-50 md:flex md:flex-row md:items-center md:justify-around">
      <nav className="flex justify-between py-4 px-8">
        <div className="text-white text-3xl md:text-3xl font-bold">
          Rasel <span className="text-[#EAB308]">.</span>
        </div>

        <div>
          <button
            className="text-2xl text-white md:hidden"
            onClick={() => {
              setOpen(!open);
            }}
          >
            {" "}
            {open ? <RxCross2 /> : <CgMenuRightAlt />}{" "}
          </button>
        </div>
      </nav>

      <div
        className={`${
          open ? "block" : "hidden"
        } md:flex md:relative md:w-auto z-10  absolute  right-0 bg-[#020617] w-full `}
      >
        <ul
          className={
            "flex flex-col md:flex-row md:gap-6 md:font-semibold gap-3 uppercase justify-center items-center text-white md:text-2xl"
          }
        >
          <li
            onClick={() => setOpen(!open)}
            className=" transform hover:text-[#EAB308]"
          >
            <Link
              className={`link ${
                pathname === "/" ? "active border-b-2 border-[#EAB308]" : ""
              }`}
              href="/"
            >
              Home
            </Link>
          </li>
          <li
            onClick={() => setOpen(!open)}
            className=" transform hover:text-[#EAB308]"
          >
            <Link
              className={`link ${
                pathname === "/about"
                  ? "active border-b-2 border-[#EAB308]"
                  : ""
              }`}
              href="/about"
            >
              About
            </Link>
          </li>

          <li
            onClick={() => setOpen(!open)}
            className=" transform hover:text-[#EAB308]"
          >
            <Link
              className={`link ${
                pathname === "/work" ? "active border-b-2 border-[#EAB308]" : ""
              }`}
              href="/work"
            >
              Work
            </Link>
          </li>
          <li
            onClick={() => setOpen(!open)}
            className=" transform hover:text-[#EAB308]"
          >
            <Link
              className={`link ${
                pathname === "/services"
                  ? "active border-b-2 border-[#EAB308]"
                  : ""
              }`}
              href="/services"
            >
              services
            </Link>
          </li>

          <li
            onClick={() => setOpen(!open)}
            className=" transform hover:text-[#EAB308]"
          >
            <Link
              className={`link ${
                pathname === "/contact"
                  ? "active border-b-2 border-[#EAB308]"
                  : ""
              }`}
              href="/contact"
            >
              contact
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Navbar