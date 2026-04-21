import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/config";
import { PropertySchema } from "../schemas/property";

export default function AddProperty() {
  const [form, setForm] = useState({
    title: "",
    location: "",
    price: "",
    status: "available",
    floor: "",
    area: "",
    rooms: "",
    features: {
      balcony: false,
      terrace: false,
      wardrobe: false,
      separateKitchen: false,
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = PropertySchema.safeParse({
      ...form,
      price: Number(form.price),
      floor: Number(form.floor),
      area: Number(form.area),
      rooms: Number(form.rooms),
      id: "temp",
    });

    if (!result.success) {
      alert("Błędne dane");
      console.log(result.error.format());
      return;
    }

    await addDoc(collection(db, "properties"), result.data);

    alert("Dodano!");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <h3>Dodaj nieruchomość</h3>

      <input placeholder="Tytuł" onChange={(e) => setForm({ ...form, title: e.target.value })} />
      <input placeholder="Lokalizacja" onChange={(e) => setForm({ ...form, location: e.target.value })} />
      <input placeholder="Cena" onChange={(e) => setForm({ ...form, price: e.target.value })} />

      <button type="submit">Dodaj</button>
    </form>
  );
}