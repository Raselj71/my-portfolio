import React from "react";
import Iconelement from "../components/Iconelement";
import htmlIcon from "@/public/icons8-html-logo-480.png";
import cssIcon from "@/public/icons8-css-480.png";
import javascriptIcon from "@/public/icons8-javascript-240.png";
import nodeIcon from "@/public/icons8-nodejs-480.png";
import reactIcon from "@/public/pngwing.com.png";
import dsaIcon from "@/public/dsa.png";
import javaIcon from "@/public/java.png";
import androidIcon from "@/public/icons8-android-480.png";
import mysqlIcon from "@/public/icons8-mysql-240.png";
import mongoIcon from "@/public/mongodb.png";
import cIcon from "@/public/c programming.png";
import cplusIcon from "@/public/c++.png";
import phpIcon from "@/public/php.png";
import taliwindIcon from "@/public/icons8-tailwind-css-480.png";
import gitIcon from "@/public/git.png";
import awsIcon from "@/public/aws.png";
import nginxIcon from "@/public/nginx.png";
import dockerIcon from "@/public/docker.png";

function page() {
  return (
    <section className="flex flex-col bg-[#111827] pb-20">
      <div className="mt-10 mx-6 md:mx-14 lg:mx-64">
        <h2 className="border-l-4 inline-block px-2 border-[#EAB308] text-3xl text-white font-semibold ">
          About
        </h2>
        <p className="mt-4 text-xl ">
          Hi there! I'm Rasel Ahammed, a passionate and dedicated software
          developer with expertise in a wide range of programming languages and
          technologies.<br></br> <br></br> Over the years, I've honed my skills
          in Node.js, JavaScript, HTML, CSS, React, Next.js, and Android
          development. My journey in the tech world has been fueled by a
          constant drive to learn and innovate.
        </p>
      </div>

      <div className="mt-10 mx-6 md:mx-14 lg:mx-64">
        <h2 className="border-l-4 inline-block px-2 border-[#EAB308] text-3xl text-white font-semibold ">
          What I Do
        </h2>
        <p className="mt-4 text-xl">
          I specialize in creating dynamic, user-friendly web and mobile
          applications. My experience spans across:
        </p>

        <div className="text-xl mt-3">
          <p>
            <span className="font-semibold text-[#EAB308]">
              Front-end Development:
            </span>{" "}
            Utilizing HTML, CSS, JavaScript, React, and Next.js to build
            responsive and engaging user interfaces
          </p>
          <p className="mt-4">
            <span className="font-semibold text-[#EAB308]">
              Back-end Development:
            </span>{" "}
            Leveraging Node.js to develop robust and scalable server-side
            applications.
          </p>
          <p className="mt-4">
            <span className="font-semibold text-[#EAB308]">
              Mobile Development:
            </span>{" "}
            Crafting seamless Android applications with Java.
          </p>
          <p className="mt-4">
            <span className="font-semibold text-[#EAB308]">
              {" "}
              Data Structures and Algorithms:
            </span>{" "}
            Applying efficient algorithms and data structures to solve complex
            problems and optimize performance.
          </p>
        </div>
      </div>

      <div className="mt-10 mx-6 md:mx-14 lg:mx-64">
        <h2 className="border-l-4 inline-block px-2 border-[#EAB308] text-3xl text-white font-semibold ">
          Experience with
        </h2>
        <div className="mt-4 relative grid grid-cols-2 gap-y-3 md:grid-cols-3 lg:grid-cols-4 -lg:gap-x-8">
          {/* <Iconelement logo={cIcon} text={"C programming"} />
          <Iconelement logo={cplusIcon} text={"C++"} />
          <Iconelement logo={javascriptIcon} text={"Javascript"} />
          <Iconelement logo={phpIcon} text={"PHP"} />

          <Iconelement logo={javaIcon} text={"Java"} />
          <Iconelement logo={dsaIcon} text={"DSA & algorithms"} />
          <Iconelement logo={htmlIcon} text={"HTML"} />
          <Iconelement logo={cssIcon} text={"CSS"} />
          <Iconelement logo={taliwindIcon} text={"Tailwind CSS"} />

          <Iconelement logo={reactIcon} text={"React js"} />
          <Iconelement logo={nodeIcon} text={"Node js"} />

          <Iconelement logo={androidIcon} text={"Android"} />
          <Iconelement logo={mysqlIcon} text={"MySql"} />
          <Iconelement logo={mongoIcon} text={"Mongodb"} />

          <Iconelement logo={gitIcon} text={"Git & Github"} />
          <Iconelement logo={awsIcon} text={"AWS"} />
          <Iconelement logo={nginxIcon} text={"NGINX Server"} />
          <Iconelement logo={dockerIcon} text={"docker"} /> */}

          <Iconelement logo={"/c++.png"} text={"C programming"} />
          <Iconelement logo={"c++.png"} text={"C++"} />
          <Iconelement
            logo={"/icons8-javascript-240.png"}
            text={"Javascript"}
          />
          <Iconelement logo={"/php.png"} text={"PHP"} />

          <Iconelement logo={"/java.png"} text={"Java"} />
          <Iconelement logo={"/dsa.png"} text={"DSA & algorithms"} />
          <Iconelement logo={"/icons8-html-logo-480.png"} text={"HTML"} />
          <Iconelement logo={"/icons8-css-480.png"} text={"CSS"} />
          <Iconelement
            logo={"/icons8-tailwind-css-480.png"}
            text={"Tailwind CSS"}
          />

          <Iconelement logo={"/pngwing.com.png"} text={"React js"} />
          <Iconelement logo={"/icons8-nodejs-480.png"} text={"Node js"} />

          <Iconelement logo={"/icons8-android-480.png"} text={"Android"} />
          <Iconelement logo={"/icons8-mysql-240.png"} text={"MySql"} />
          <Iconelement logo={"/mongodb.png"} text={"Mongodb"} />

          <Iconelement logo={"/git.png"} text={"Git & Github"} />
          <Iconelement logo={"/aws.png"} text={"AWS"} />
          <Iconelement logo={"/nginx.png"} text={"NGINX Server"} />
          <Iconelement logo={"/docker.png"} text={"docker"} />
        </div>
      </div>

      <div className="mt-10 mx-6 md:mx-14 lg:mx-64">
        <h2 className="border-l-4 inline-block px-2 border-[#EAB308] text-3xl text-white font-semibold ">
          Education
        </h2>
        <p className="mt-4 text-lg">
          Currently enrolling Bachelor of Computer Science and Engineering at
          Greeen University of Bangladesh and expected to graducate in 2026.
        </p>
      </div>
    </section>
  );
}

export default page;
