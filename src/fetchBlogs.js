import { query } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { db } from "./firebase";
import { getDocs } from "firebase/firestore";

async function fetchBlogs() {
  const q = query(collection(db, "blogs"));
  const querySnapshot = await getDocs(q);
  const blogsData = querySnapshot.docs.map((doc) => ({
    data: doc.data(),
  }));
  const result = blogsData.map((blogData) => {
    return blogData.data;
  });

  return result;
}
export default fetchBlogs;
