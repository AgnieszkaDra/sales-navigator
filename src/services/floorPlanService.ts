import { ref, getDownloadURL } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import { storage, db } from "../firebase/config";

export async function connectFloorPlan(
  propertyId: string,
  fileName: string
) {
  const imageRef = ref(storage, fileName);

  const url = await getDownloadURL(imageRef);

  const propertyRef = doc(db, "properties", propertyId);

  await updateDoc(propertyRef, {
    floorPlanUrl: url,
  });

  return url;
}