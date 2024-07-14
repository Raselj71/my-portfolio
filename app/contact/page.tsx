import React from 'react'
import { FaPhoneAlt } from "react-icons/fa";
import { MdMail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { BsWhatsapp } from "react-icons/bs";
import dynamic from 'next/dynamic';

const SendEmailButton = dynamic(() => import('@/app/components/EmailButton'), { ssr: false });

function page() {
  return (
    <section className='lg:flex lg:justify-center lg:gap-8 lg:mt-20'>

                       <div className='bg-[#111827] px-4 py-5 mx-4 md:mx-16 my-4 rounded-lg'>
                            <form >
                                 <h2 className='text-white text-xl font-semibold text-center mb-10'>Lets work together</h2>
                                 
                                     <div className='flex flex-col gap-2 my-1'>
                                         <input className='bg-[#020617] px-1 h-9 outline-[#EAB308] border-none' type="text" id='name' required placeholder='name'/>
                                        
                                     </div>
                                       <div  className='flex flex-col gap-2 my-1'>
                                         <input className='bg-[#020617] px-1 h-9 outline-[#EAB308] border-none' type="email" id='email' placeholder='email' required />
                                         
                                     </div>
                                     <div>
                                       <textarea className='bg-[#020617] h-40 px-1 h-9 outline-[#EAB308] border-none w-full' name="message" cols={47} rows={5} id="message" placeholder='type your message here'></textarea>
                                     </div>

                                     <SendEmailButton />
                            </form>
                       </div>

                       <div className='mx-8 mt-10 md:mx-16'>
                          <p className='text-white text-2xl mb-10 font-semibold'>Contact Me</p>
                           <div className='flex items-center gap-2 lg:gap-6 my-2 lg:my-4'>
                                <FaPhoneAlt className='text-4xl lg:text-5xl bg-[#111827] p-2 text-[#EAB308]'/>
                                 <div>
                                   <p className='text-gray-400 lg:text-lg'>Phone</p>
                                   <a className='text-slate-300 lg:text-xl hover:underline' href="tel:+8801836849353">+8801836849353</a>
                                 </div>
                           </div>
                            <div className='flex items-center gap-2 my-2 lg:gap-6 lg:my-4'>
                                <MdMail className='text-4xl bg-[#111827] p-2 text-[#EAB308] lg:text-5xl'/>
                                 <div>
                                   <p className='text-gray-400 lg:text-lg'>Email</p>
                                    <a className='text-slate-300 lg:text-xl hover:underline' href="mailto:rase.cse.green@gmail.com">rasel.cse.green@gmail.com</a>
                                 </div>
                           </div>
                            <div className='flex items-center gap-2 my-2 lg:gap-6 lg:my-4'>
                                <FaLocationDot className='text-4xl lg:text-5xl bg-[#111827] p-2 text-[#EAB308]'/>
                                 <div>
                                   <p className='text-gray-400 lg:text-lg'>Location</p>
                                   <p className='text-slate-300 lg:text-xl'>Dhaka, Bangladesh</p>
                                 </div>
                           </div>
                            <div className='flex items-center gap-2 my-2 lg:gap-6 lg:my-4'>
                                <BsWhatsapp className='text-4xl lg:text-5xl bg-[#111827] p-2 text-[#EAB308]'/>
                                 <div>
                                   <p className='text-gray-400 lg:text-lg'>Whatsapp</p>
                                   <a className='text-slate-300 lg:text-xl hover:underline' href="https://wa.me/+8801836849353">send message</a>
                                 </div>
                           </div>
                       </div>
    </section>
  )
}

export default page