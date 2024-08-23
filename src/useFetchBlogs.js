import { query } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { db } from "./firebase";
import { getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";

function useFetchBlogs() {
  const [blogsData, setBlogs] = useState([]);
  const [error, setError] = useState();
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const q = query(collection(db, "blogs"));
        const querySnapshot = await getDocs(q);
        const blogsData = querySnapshot.docs.map((doc) => doc.data());
        setBlogs(blogsData);
      } catch (error) {
        console.error("ERROR WHILE FETCHING");
        setError("ERROR WHILE FETCHING");
      }
    };
    fetchBlogs();
  }, []);
  return {
    blogsData,
    error,
  };
}
export default useFetchBlogs;
