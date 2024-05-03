/* eslint-disable @next/next/no-img-element */

import { IoReorderThree, IoCloseSharp } from "react-icons/io5";

import imga from '../../../../../../public/logo.png'
import Image from "next/image";
import { useState } from "react";

export default function HeaderNavigation() {

  return (
    <main>
      <div className="bg-txt flex items-center justify-between p-4 border-b border-grid">
        <div className="flex items-center gap-4 w-3/6">

          <IoReorderThree className="text-5xl text-fund" />
          <IoCloseSharp className="text-5xl text-fund" />

          <div className="flex justify-items-center ml-auto">
            <Image src={imga}
              width={150}
              height={150}
              alt="logo" />
          </div>
        </div>
      </div>
    </main>
  )
}