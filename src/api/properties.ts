import { collection, doc, getDoc,  getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import { PropertySchema, type Property } from "../schemas/property";

export const getProperties = async (): Promise<Property[]> => {
  const snapshot = await getDocs(collection(db, "properties"));

  return snapshot.docs.map((document) => {
    const data = document.data();

    const parsed = PropertySchema.safeParse({
      ...data,
      id: document.id,
    });

    if (!parsed.success) {
      console.error("Invalid property:", parsed.error);
      console.error("ID:", document.id);
      console.log("DATA:", data);
      console.log(parsed.error.format());
      return null;
    }

    return parsed.data;
  }).filter((p): p is Property => p !== null);
};

export const getProperty = async (
  id: string
): Promise<Property | null> => {
  console.log("POBIERAM PROPERTY ID:", id);
  const snapshot = await getDoc(doc(db, "properties", id));

  console.log("DOCUMENT EXISTS:", snapshot.exists())

  if (!snapshot.exists()) {
    return null;
  }

  const data = snapshot.data();

  console.log("RAW FIRESTORE DATA:", data);
  console.log("RAW FLOOR PLAN:", data.floorPlan);

  const parsed = PropertySchema.safeParse({
    id: snapshot.id,
    ...data,
  });

  console.log("PARSED PROPERTY:", parsed);

  if (!parsed.success) {
     console.error("Invalid property:", parsed.error);
  console.log("PARSED DATA:", parsed.data);
    return null;
  }

  return parsed.data;
};