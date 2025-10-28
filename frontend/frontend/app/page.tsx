'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react';

export default function Home() {

  const [imageHover, setImageHover] = useState(false);

  const handleHover = () => {
    setImageHover(!imageHover)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-[#CAA286]">
      <div className="w-full max-w-md flex justify-center -mt-12">
        <Image
          src="/Logo.svg"
          alt="Logo Image"
          width={600}
          height={400}
          />
      </div>

      <div className="w-full max-w-md mb-2 flex justify-center relative">
        <Image
          src="/HappyTartan.svg"
          alt="Happy Tartan Image"
          width={200}
          height={100}
          className="absolute transition-opacity duration-300"
          style={{opacity:  imageHover === true ? 0 : 1}}
          />
          <Image
          src="/DeadTartan.svg"
          alt="Dead Tartan Image"
          width={200}
          height={100}
          className="duration-300"
          style={{opacity:  imageHover === true ? 1 : 0}}
          />
      </div>
      <div className="w-full max-w-md mb-4 flex justify-center">
        <Link
          href="/chat"
          onMouseEnter={handleHover}
          onMouseLeave={handleHover}
        >
          <Image
            src="/Chat.svg"
            alt="Chat"
            width={150}
            height={60}
            className="cursor-pointer transition-transform hover:scale-110"
          />
        </Link>
      </div>
    </div>
  );
}
