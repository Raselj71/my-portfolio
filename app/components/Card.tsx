import { StaticImageData } from "next/image";
import React from "react";

import Image from "next/image";
import { GrGithub } from "react-icons/gr";
import { IoOpenOutline } from "react-icons/io5";
import Link from "next/link";
import { Url } from "url";


type cardtype = {
  icon:  any;
  title: String;
  des:String[];
  github:any;
  live:any;
};

function Card({icon,title,des,github,live}:cardtype) {
  return (
    <div className="w-full mb-4 pb-4 bg-gray-800   shadow-lg shadow-slate-950 overflow-hidden hover:scale-105 transform transition-all duration-300">
      <div className="w-full h-[200px] md:h-[250px]">
        {/* <Image
          src={icon}
          alt="Realtime Chat App"
          className="w-full h-full  object-cover"
        /> */}

        <img
          src={icon}
          alt="Realtime Chat App"
          className="w-full h-full  object-cover"
        />
      </div>
      <p className="text-2xl font-semibold text-center text-white py-4">
        {title}
      </p>
      <div className="flex flex-wrap justify-center items-center gap-2 px-4">
        {des.map((tech, i) => (
          <span
            key={i}
            className="rounded-full px-3 py-1 text-white bg-yellow-500 hover:bg-orange-500"
          >
            {tech}
          </span>
        ))}
      </div>
      <div className="flex justify-center mt-6 text-3xl gap-4">
        <Link
          className="rounded-full border-2 p-2 border-yellow-500 text-yellow-500 hover:text-white hover:bg-yellow-500 transition-colors"
          href={github}
          target="_blank"
        >
          <GrGithub />
        </Link>
        <Link
          className="rounded-full border-2 p-2 border-yellow-500 text-yellow-500 hover:text-white hover:bg-yellow-500 transition-colors"
          href={live}
          target="_blank"
        >
          <IoOpenOutline />
        </Link>
      </div>
    </div>
  );
}

export default Card;
