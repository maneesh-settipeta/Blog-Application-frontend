import { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

function Header() {
  const [userDetails, setUserDetails] = useState(null);
  console.log(userDetails);

  const fetchData = async () => {
    auth.onAuthStateChanged(async (user) => {
      const docref = doc(db, "users", user.uid);
      const docData = await getDoc(docref);
      if (docData.exists()) {
        setUserDetails(docData.data());
      }
    });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const firstNameExtract = userDetails?.firstName[0] || "";
  const secondNameExtract = userDetails?.lastName[0] || "";
  return (
    <>
      <div className="pl-6 pt-4 pb-4 text-5xl text-white font-bold border-b border-black mb-3 flex justify-between ">
        <Link to="/blogs">
          <h1 className="font-sans"> Blogs</h1>
        </Link>
        <button className="rounded-full font-medium text-2xl p-4 bg-customcolorred mr-7 ">
          {firstNameExtract + secondNameExtract}
        </button>
      </div>
    </>
  );
}
export default Header;
