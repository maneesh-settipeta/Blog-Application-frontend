import { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

function useFetchUserData() {
  const [userData, setUserData] = useState(null);

  const [error, setErrorStatus] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        try {
          const userData = await getDoc(docRef);
          if (userData.exists()) {
            setUserData(userData.data());
          } else {
            console.error("No user Details found");
          }
        } catch (error) {
          console.error("error while fetching");
        }
      } else {
        setErrorStatus("User fetching data rejected");
      }
    });
  }, []);
  return {
    userData,
    error,
  };
}

export default useFetchUserData;
