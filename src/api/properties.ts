// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../firebase/config";

// export const getProperties = async () => {
//   const snapshot = await getDocs(collection(db, "properties"));

//   return snapshot.docs.map(doc => ({
//     id: doc.id,
//     ...doc.data()
//   }));
// };

import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";

export const getProperties = async () => {
  const snapshot = await getDocs(collection(db, "properties"));

  return snapshot.docs.map((doc) => {
    const data = doc.data();

    return {
      id: doc.id,
      ...data,
      area: typeof data.area === "string"
        ? parseFloat(data.area.replace(",", "."))
        : data.area,
    };
  });
};