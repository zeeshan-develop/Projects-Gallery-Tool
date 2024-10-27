"use client";

import Image from "next/image";
import logo from "@/public/logo.png";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";

export function Header() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative  left-0 w-full flex justify-between items-center p-4  bg-white  ">
      <Link href="/">
        <Image
          src={logo}
          className="w-10 md:w-24 h-auto"
          alt="Logo"
          width={50}
          height={50}
          priority
        />
      </Link>
      <div className="flex gap-2">
        <Link href="/addprojects">
          <button
            type="button"
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 rounded-full text-md p-2 px-4 tracking-wider me-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            <span className="hidden sm:block">Add Project</span>
            <HiOutlinePencilSquare className="sm:hidden text-[20px]" />
          </button>
        </Link>

        {!session ? (
          <button
            type="button"
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 rounded-full text-md p-2 px-4 tracking-wider me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            onClick={() => signIn()}
          >
            <span className="hidden sm:block">Sign In</span>
            <HiOutlinePencilSquare className="sm:hidden text-[20px]" />
          </button>
        ) : (
          <div className="relative">
            <button
              id="dropdownUserAvatarButton"
              data-dropdown-toggle="dropdownAvatar"
              className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300"
              type="button"
              onClick={() => setOpen((p) => !p)}
            >
              <span className="sr-only">Open user menu</span>
              <Image
                src={session.user.image}
                alt="User photo"
                width={50}
                height={50}
                className="rounded-full"
              />
            </button>
            <div
              id="dropdownAvatar"
              className={`z-10 ${
                !open ? "hidden" : "block"
              } bg-white divide-y transition-all duration-300 divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600 absolute right-0`}
            >
              <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                <div>{session.user.name}</div>
                <div className="font-medium truncate">{session.user.email}</div>
              </div>
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownUserAvatarButton"
              >
                <li>
                  <Link
                    href="/userprofile"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Dashboard
                  </Link>
                </li>
              </ul>
              <div className="py-2">
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  onClick={() => signOut()}
                >
                  Sign out
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
