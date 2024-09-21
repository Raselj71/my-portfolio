import React from 'react'
import Image, { StaticImageData } from 'next/image'

interface data{
  logo: any;
  text:String;
}

function Iconelement({logo,text}:data) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="size-32 hover:scale-110 transform transition-all">
        {/* <Image src={logo} alt="text" /> */}
        <img src={logo} alt="text" />
      </div>
      <p className="text-lg font-semibold text-white">{text}</p>
    </div>
  );
}

export default Iconelement