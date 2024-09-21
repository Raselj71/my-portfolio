import Image from "next/image";
import { FiDownload } from "react-icons/fi";
import { GrGithub } from "react-icons/gr";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import Link from "next/link";
import Profile from "@/public/profile.png";
import { FaLinkedinIn } from "react-icons/fa6";
import { profile } from "console";

export default function Home() {
  return (
    <main className="bg-[#111827] min-h-lvh">
      <div className="flex flex-col md:flex-row md:items-center md:flex-row-reverse md:justify-around md:w-full md:py-10 md:px-6 lg:justify-center lg:py-20 lg:gap-32">
        <div className="relative size-80 lg:size-96  mt-10 lg:mt-0 mx-auto md:mx-0 ">
          {/* <Image className="object-cover w-full h-full rounded-full" src={Profile} alt="rasel ahmed" /> */}
          <img
            className="object-cover w-full h-full rounded-full"
            src="/profile.png"
            alt="rasel ahmed"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c101a] via-transparent to-transparent rounded-full border-4 border-[#EAB308]"></div>
        </div>
        <div className="md:text-start">
          <h2 className="text-white mt-3 md:text-start text-center text-2xl lg:text-3xl">
            Software Developer
          </h2>
          <h2 className="text-white text-center md:text-start text-5xl  font-bold mt-2 md:mt-6 md:mb-6 lg:text-6xl">
            Hello I'm<br />{" "}
            <span className="text-[#EAB308] px-4">Rasel Ahammed</span>
          </h2>
           <h3 className="text-center mt-4 font-sans md:text-start">(Full stack developer intern at CodeAlpha)</h3>
          <p className="text-lg text-center md:text-start md:text-sm md:mb-6 lg:text-2xl mt-10 md:w-80 lg:w-[500px] px-4 md:px-0">
            A passionate software developer skilled in Node.js, JavaScript,
            React, Next.js, and Android development. I love turning complex
            problems into simple, elegant solutions through innovative web and
            mobile applications.
          </p>
          <div className=" md:flex md:items-center md:gap-6 lg:gap-20">
            <a
              href="/resume.pdf"
              className=" lg:text-lg lg:font-semibold mx-20 md:text-start md:mx-0 mt-2 mb-3 px-4 py-2 rounded-lg flex items-center justify-center gap-4 border-2 border-[#EAB308] text-[#EAB308] hover:text-white hover:bg-[#EAB308]"
            >
              download resume <FiDownload />
            </a>
            <div className="flex justify-center gap-5 mb-10 md:mb-0 ">
              <Link
                className="text-2xl lg:text-3xl rounded-full border-2 p-1 lg:p-2 border-[#EAB308] text-[#EAB308] hover:text-white hover:bg-[#EAB308]"
                href={"https://www.linkedin.com/in/rasel221/"}
                target="_blank"
              >
                <GrGithub />
              </Link>
              <Link
                className="text-2xl lg:text-3xl rounded-full border-2 p-1 lg:p-2 border-[#EAB308] text-[#EAB308] hover:text-white hover:bg-[#EAB308]"
                href={"https://github.com/Raselj71"}
                target="_blank"
              >
                <FaLinkedinIn />
              </Link>
              <Link
                className="text-2xl rounded-full lg:text-3xl border-2 p-1 lg:p-2 border-[#EAB308] text-[#EAB308] hover:text-white hover:bg-[#EAB308]"
                href={"https://youtube.com/techtutorpro"}
                target="_blank"
              >
                <FaYoutube />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
