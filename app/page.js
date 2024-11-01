"use client";
import dynamic from "next/dynamic";

const Gallery = dynamic(() => import("./projects/page"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const Home = () => {
  return (
    <div>
      <Gallery />
    </div>
  );
};

export default Home;
