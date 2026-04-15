import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";

export const getProperties = async () => {
  const snapshot = await getDocs(collection(db, "properties"));

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};