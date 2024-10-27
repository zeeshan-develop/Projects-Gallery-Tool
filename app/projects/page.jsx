"use client";
import { usePosts } from "@/context/AppContext";
import Postitems from "./Postitems";

const Gallery = () => {
  const { posts } = usePosts();

  return (
    <>
      <div className="text-center mb-4">
        <h1 className="sm:text-3xl text-2xl font-bold title-font text-blue-500 mb-4">
          STREAMLINING PROJECTS
        </h1>
        <div className="flex mt-6 justify-center">
          <div className="w-16 h-1 rounded-full bg-gray-400 inline-flex"></div>
        </div>
      </div>
      <div className="flex flex-wrap">
        {posts.map((post, i) => (
          <Postitems post={post} key={i} val={i} />
        ))}
      </div>
    </>
  );
};

export default Gallery;
