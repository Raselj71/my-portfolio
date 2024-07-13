import React from "react";
import Card from "../components/Card";
import Chatapp from "@/public/chatting app project.png";
import { URL } from "url";
import pdf from "@/public/ALL PDFS.jpg";
import emi from "@/public/Loan & EMI Calculators.png";
import ecommerce from "@/public/Ecommerce Project.png";
import jobbord from '@/public/jobbord.png'
import portfolio from '@/public/portfolio.png'

function page() {
  return (
    <section className="flex flex-col bg-[#111827]">
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
          title={"Realtime Chat Application"}
          github={""}
          live={""}
          des={[
            "HTML",
            "CSS",
            "JavaScript",
            "React JS",
            "Next JS",
            "JWT",
            "MongoDB",
            "Socket",
          ]}
          icon={Chatapp}
        />

        <Card
          title={"Job bord"}
          github={""}
          live={""}
          des={[
            "HTML",
            "CSS",
            "JavaScript",
            "PHP",
            "MySql",
            "Authentication",
            "bootstrap",
            "Socket",
          ]}
          icon={jobbord}
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
          icon={pdf}
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
          icon={emi}
        />
        <Card
          title={"Ecommerce project using java-Swing"}
          github={"https://github.com/Raselj71/Ecommerce-Project.git"}
          live={""}
          des={[
            "HTML",
            "CSS",
            "JavaScript",
            "React JS",
            "Next JS",
            "JWT",
            "MongoDB",
            "Socket",
          ]}
          icon={ecommerce}
        />

        <Card
          title={"My Portfolio Website"}
          github={""}
          live={""}
          des={[
            "HTML",
            "CSS",
            "JavaScript",
            "React JS",
            "Next JS",
            "JWT",
            "MongoDB",
          ]}
          icon={portfolio}
        />
      </div>
    </section>
  );
}

export default page;
