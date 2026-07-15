import { collection, doc, getDoc,  getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import { PropertySchema, type Property } from "../types";

// export const getProperties = async () => {
//   const snapshot = await getDocs(collection(db, "properties"));

//   // return snapshot.docs.map((doc) => {
//   //   const data = doc.data();

//   //   return {
//   //     id: doc.id,
//   //     ...data,
//   //     area: typeof data.area === "string"
//   //       ? parseFloat(data.area.replace(",", "."))
//   //       : data.area,
//   //   };
//   // });
//   return snapshot.docs.map((document) =>
//     PropertySchema.parse({
//       id: document.id,
//       ...document.data(),
//     })
//   );

// };
export const getProperties = async (): Promise<Property[]> => {
  const snapshot = await getDocs(collection(db, "properties"));

  return snapshot.docs.map((document) => {
    const data = document.data();

    const parsed = PropertySchema.safeParse({
      id: document.id,
      ...data,
    });

    if (!parsed.success) {
      console.error("Invalid property:", parsed.error);
      return null;
    }

    return parsed.data;
  }).filter((p): p is Property => p !== null);
};
// export const getProperty = async (id: string) => {
//   const snapshot = await getDoc(doc(db, "properties", id));

//   if (!snapshot.exists()) {
//     return null;
//   }

//   // const data = snapshot.data();

//   // return {
//   //   id: snapshot.id,
//   //   ...data,
//   //   area:
//   //     typeof data.area === "string"
//   //       ? parseFloat(data.area.replace(",", "."))
//   //       : data.area,
//   // };
//   return PropertySchema.parse({
//     id: snapshot.id,
//     ...snapshot.data(),
//   });
// };

export const getProperty = async (
  id: string
): Promise<Property | null> => {
  const snapshot = await getDoc(doc(db, "properties", id));

  if (!snapshot.exists()) {
    return null;
  }

  const data = snapshot.data();

  const parsed = PropertySchema.safeParse({
    id: snapshot.id,
    ...data,
  });

  if (!parsed.success) {
    console.error("Invalid property:", parsed.error);
    return null;
  }

  return parsed.data;
};