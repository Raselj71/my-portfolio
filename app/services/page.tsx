import React from "react";
import ServiceCard from "../components/ServiceCard";
import {
  FaLaptopCode,
  FaMobileAlt,
  FaDatabase,
  FaHandsHelping,
} from "react-icons/fa";

function page() {
    const services = [
      {
        title: "Web Development",
        description:
          "Creating responsive, user-friendly websites with HTML, CSS, JavaScript, React, and Next.js.",
        icon: <FaLaptopCode className="text-blue-500" />,
      },
      {
        title: "Mobile Development",
        description:
          "Designing and developing intuitive Android applications using Java.",
        icon: <FaMobileAlt className="text-green-500" />,
      },
      {
        title: "Data Structures & Algorithms",
        description:
          "Applying efficient algorithms and data structures to solve complex problems.",
        icon: <FaDatabase className="text-purple-500" />,
      },
      {
        title: "Consultation",
        description:
          "Offering consultation services to help you plan and strategize your projects.",
        icon: <FaHandsHelping className="text-red-500" />,
      },
    ];
  return (
    <section className="flex flex-col bg-[#111827] pb-10">
      <div className="mt-10 mx-6 md:mx-14 lg:mx-64">
        <h2 className="border-l-4 inline-block px-2 border-[#EAB308] text-3xl text-white font-semibold ">
          My services
        </h2>
        <p className="mt-4 text-lg">
          As a versatile software developer, I offer a range of services to help
          you achieve your digital goals.
        </p>
      </div>

      <div className="mt-10 mx-6 md:mx-14 lg:mx-64 flex flex-col justify-center items-center gap-y-16 lg:grid lg:grid-cols-3 gap-4">
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            title={service.title}
            description={service.description}
            icon={service.icon}
          />
        ))}
      </div>
      <div className="mt-10 mx-6 md:mx-14 lg:mx-64">
        <h2 className="border-l-4 inline-block px-2 border-[#EAB308] text-3xl text-white font-semibold ">
          Get in Touch
        </h2>
        <p className="mt-4 text-lg">
          Ready to start your next project? Contact me today to discuss your
          requirements and see how I can help you achieve your digital goals.
        </p>
      </div>
    </section>
  );
}

export default page;
