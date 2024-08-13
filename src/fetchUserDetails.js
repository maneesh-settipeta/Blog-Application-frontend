import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

async function fetchUserDetails() {
  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        try {
          const userData = await getDoc(docRef);
          if (userData.exists()) {
            console.log(userData.data());
            resolve(userData.data());
          } else {
            console.error("No user Details found");
          }
        } catch (error) {
          console.error("error while fetching");
        }
      } else {
        reject("User fetching data rejected");
      }
    });
  });
}

export default fetchUserDetails;
