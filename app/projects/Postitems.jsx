import React from "react";
import Link from "next/link";
import Image from "next/image"; // Import the Image component

const Postitems = ({ post, del, val }) => {
  return (
    <>
      {/* card  */}
      <div className="p-4 md:w-[25%]">
        <div className="h-full border-2 border-gray-200 border-opacity-60 overflow-hidden">
          <Image
            className="lg:h-56 w-full object-cover object-center shadow-5 transition-transform duration-300 ease-in-out transform hover:scale-110"
            src={post.image}
            alt="blog"
            width={640} // Adjust based on your design
            height={360} // Adjust based on your design
          />
          <div className="p-6">
            <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
              CATEGORY
            </h2>
            <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
              {post.title}
            </h1>
            <p className="leading-relaxed text-justify mb-3">{post.message}</p>
            <div className="flex items-center flex-wrap">
              <Link
                href={`/projects/${val}`}
                className="text-white inline-flex items-center md:mb-2 lg:mb-0 border bg-blue-500 p-4 rounded-md cursor-pointer"
              >
                Learn More
                <svg
                  className="w-4 h-4 ml-2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14"></path>
                  <path d="M12 5l7 7-7 7"></path>
                </svg>
              </Link>
            </div>
          </div>
          {del}
        </div>
      </div>
    </>
  );
};

export default Postitems;
