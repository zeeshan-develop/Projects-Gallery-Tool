"use client";
import { usePosts } from "@/context/AppContext";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { FaGithub } from "react-icons/fa6";
import { IoLogoLinkedin } from "react-icons/io";
import Image from "next/image";

const ProjectDetail = () => {
  const { data: session } = useSession();
  const { posts } = usePosts();
  const { Id: postId } = useParams();
  const detail = posts[postId];

  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap ">
            <div className="w-full lg:w-1/3 ">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                BRAND NAME
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
                {detail?.title}
              </h1>
              <Image
                alt="ecommerce"
                className="lg:w-full w-full lg:h-60 h-32 object-cover object-center rounded mb-4 shadow-5"
                src={detail?.image}
                width={640}
                height={360}
              />
              <div>
                <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 ">
                  Description
                </h1>
                <div className="flex mt-1 mb-4">
                  <div className="w-36 h-1 rounded-full bg-indigo-500 inline-flex"></div>
                </div>
              </div>
              <p className="leading-relaxed text-justify mb-4 ">
                {detail?.message}
              </p>
              <a className="inline-flex items-center border-t-2 border-gray-100 w-full py-4">
                <Image
                  alt="blog"
                  src={session?.user.image}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center"
                />
                <span className="flex-grow flex flex-col pl-4">
                  <span className="title-font font-medium text-gray-900">
                    {session?.user.name}
                  </span>
                  <span className="text-gray-400 text-xs tracking-widest mt-0.5">
                    {session?.user.email}
                  </span>
                </span>
              </a>
            </div>
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0 ">
              <div className="flex flex-col">
                <div>
                  <span className="inline-block py-1 px-2 rounded bg-indigo-50 text-indigo-500 text-xl font-bold tracking-widest mb-2">
                    Technologies
                  </span>
                </div>
                <div>
                  {detail?.technologies.map((tech, i) => (
                    <button
                      type="button"
                      className="text-gray-500 bg-white border rounded-2xl border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-bold text-sm px-5 py-2.5 me-2 mb-2"
                      key={i}
                    >
                      {tech}
                    </button>
                  ))}
                </div>
                <div className="my-4">
                  <span className="inline-block py-1 px-2 rounded bg-indigo-50 text-indigo-500 text-xl font-bold tracking-widest mb-2">
                    Source/Links
                  </span>
                </div>

                <Link href="/" className="inline-flex items-center w-full py-2">
                  <FaGithub className="w-12 h-12 text-gray-900 flex-shrink-0" />
                  <span className="flex-grow flex flex-col pl-4">
                    <span className="title-font font-medium text-blue-500">
                      {detail?.githubUrl}
                    </span>
                  </span>
                </Link>

                <Link href="/" className="inline-flex items-center w-full py-2">
                  <IoLogoLinkedin className="w-12 h-12 rounded-full flex-shrink-0 object-cover object-center text-blue-500" />

                  <span className="flex-grow flex flex-col pl-4">
                    <span className="title-font font-medium text-blue-500">
                      {detail?.linkedinUrl}
                    </span>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;
