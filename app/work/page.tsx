import React from "react";
import Card from "../components/Card";
import Chatapp from "@/public/chatting app project.png";
import { URL } from "url";
import pdf from "@/public/ALL PDFS.jpg";
import emi from "@/public/Loan & EMI Calculators.png";
import ecommerce from "@/public/Ecommerce Project.png";
import jobbord from '@/public/jobbord.png'
import portfolio from '@/public/portfolio.png'
import restApi from '@/public/restapi.png'
import globemart from '@/public/globemart.png'

function page() {
  return (
    <section className="flex flex-col bg-[#111827] pb-10">
      <div className="mt-10 mx-6 md:mx-14 lg:mx-64">
        <h2 className="border-l-4 inline-block px-2 border-[#EAB308] text-3xl text-white font-semibold ">
          My works
        </h2>
        <p className="mt-4 text-lg">
          These project are made when I have spare time.
        </p>
      </div>

      <div className="mt-10 mx-6 md:mx-14 lg:mx-64 flex flex-col justify-center items-center gap-y-16 lg:grid lg:grid-cols-3 gap-4">

      <Card
          title={"Foodi - Resturant Landing page design"}
          github={
            "https://github.com/Raselj71/Foodi-React-website.git"
          }
          live={"https://foodi.codewithrasel.com"}
          des={[
            "HTML",
            "CSS",
            "Tailwind css",
            "Typescript",
            "Next JS",
           
      
          ]}
          icon={"/foodi.png"}
        />

        <Card
          title={"GlobeMart-Nextjs Ecommerce project"}
          github={
            "https://github.com/Raselj71/GlobeMart-Nextjs-ecommerce-project.git"
          }
          live={"https://globemart.vercel.app/"}
          des={[
            "HTML",
            "CSS",
            "Redux",
            "Typescript",
            "Next JS",
            "JWT",
            "MongoDB",
            "Stripe",
          ]}
          icon={"/globemart.png"}
        />

        <Card
          title={"Realtime Chat Application"}
          github={"https://github.com/Raselj71/Chat-app-Client.git"}
          live={""}
          des={[
            "HTML",
            "CSS",
            "JavaScript",
            "Typescript",
            "Next JS",
            "JWT",
            "MongoDB",
            "Socket",
          ]}
          icon={"/chatting app project.png"}
        />

        <Card
          title={"Job bord-job listing"}
          github={"https://github.com/Raselj71/Job-board"}
          live={""}
          des={[
            "HTML",
            "CSS",
            "JavaScript",
            "PHP",
            "MySql",
            "Authentication",
            "bootstrap",
          ]}
          icon={"/jobbord.png"}
        />

        <Card
          title={"My Portfolio Website"}
          github={"https://github.com/Raselj71/my-portfolio"}
          live={""}
          des={[
            "HTML",
            "CSS",
            "JavaScript",
            "React JS",
            "Next JS",
            "JWT",
            "Typescript",
          ]}
          icon={"/portfolio.png"}
        />

        <Card
          title={"Rest API node js & MySql"}
          github={
            "https://github.com/Raselj71/Rest-API-using-Express-and-MySql-Database"
          }
          live={""}
          des={["node js", "JavaScript", "MySql", "CRUD operation", "Rest API"]}
          icon={"/restapi.png"}
        />
        <Card
          title={"PDF master Reader"}
          github={"https://github.com/Raselj71/Pdf_Reader.git"}
          live={""}
          des={[
            "Java",
            "Xml",
            "Android studio",
            "SqLite",
            "pdf library",
            "darkmode",
            "bookmark",
            "recent",
          ]}
          icon={"/ALL PDFS.jpg"}
        />
        <Card
          title={"Emi and loan calculators"}
          github={"https://github.com/Raselj71/EMI_Calculator.git"}
          live={""}
          des={[
            "java",
            "xml",
            "android studio",
            "SqLite db",
            "Graph and chart",
          ]}
          icon={"/Loan & EMI Calculators.png"}
        />
        <Card
          title={"Ecommerce project using java-Swing"}
          github={"https://github.com/Raselj71/Ecommerce-Project.git"}
          live={""}
          des={["java", "Java Swing", "MySql", "Authentication", "OOP"]}
          icon={"/Ecommerce Project.png"}
        />
      </div>
    </section>
  );
}

export default page;
