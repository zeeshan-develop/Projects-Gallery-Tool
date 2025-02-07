"use client";
import app from "@/lib/firebase";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import Swal from "sweetalert2";

const postsContext = createContext();

const AppContext = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const db = getFirestore(app);

  const getPosts = useCallback(async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "posts"));
      const postsArray = [];

      querySnapshot.forEach((doc) => {
        postsArray.push({ id: doc.id, ...doc.data() });
      });
      setPosts(postsArray);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error getting documents",
        text: error.message,
        confirmButtonText: "Ok",
      });
    }
  }, [db]);

  useEffect(() => {
    getPosts();
  }, [getPosts]);

  const postsData = {
    posts,
    getPosts,
  };

  return (
    <postsContext.Provider value={postsData}>{children}</postsContext.Provider>
  );
};

export const usePosts = () => {
  return useContext(postsContext);
};

export default AppContext;
