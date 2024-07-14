import React from 'react'
import { IconType } from 'react-icons';

type cardType={
    title:String;
    description:String;
    icon:any;
}

function ServiceCard({ title, description, icon }:cardType) {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg p-6 m-4 flex flex-col justify-center items-center ">
      <div className="text-4xl mb-4 text-center">{icon}</div>
      <div className="font-bold text-xl mb-2 text-center text-slate-400">{title}</div>
      <p className="text-base text-center">{description}</p>
    </div>
  );
}

export default ServiceCard