"use client";
import dynamic from "next/dynamic";
import { usePosts } from "@/context/AppContext";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import { doc, deleteDoc, getFirestore } from "firebase/firestore"; // Make sure to import these from Firebase
import app from "@/lib/firebase";

const Postitems = dynamic(() => import("../projects/Postitems"), {
  srr: false,
  loading: () => <p>Loading...</p>,
});

const UserProfile = () => {
  const { posts, getPosts } = usePosts();
  const { data: session } = useSession();
  const db = getFirestore(app);
  const handleDelete = async (postId) => {
    try {
      const postRef = doc(db, "posts", postId);
      await deleteDoc(postRef);
      getPosts();
      Swal.fire({
        icon: "success",
        title: "Post Deleted!",
        text: "Your post has been successfully deleted.",
        confirmButtonText: "Ok",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Delete Failed!",
        text: error.message,
        confirmButtonText: "Ok",
      });
    }
  };

  return (
    <div>
      <div className="text-center mb-4">
        <h1 className="sm:text-3xl text-2xl font-bold title-font text-blue-500 mb-4">
          USER PROFILE
        </h1>
        <div className="flex mt-6 justify-center">
          <div className="w-16 h-1 rounded-full bg-gray-400 inline-flex"></div>
        </div>
      </div>
      {session?.user.email && (
        <>
          <div className="flex flex-wrap">
            {posts.map((post, i) => (
              <Postitems
                key={i}
                post={post}
                del={
                  <button
                    className="bg-red-400 w-full rounded-md text-white py-4"
                    onClick={() => handleDelete(post.id)}
                  >
                    Delete
                  </button>
                }
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default UserProfile;
