import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/config";

export async function getFloorPlan(fileName: string) {
   
    const imageRef = ref(storage, fileName);

    const url = await getDownloadURL(imageRef);

    return url;

}