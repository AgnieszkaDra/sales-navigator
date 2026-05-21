import { useState } from "react";
import {
  addDoc,
  collection,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { PropertySchema } from "../schemas/property";

type FormState = {
  title: string;
  location: string;
  price: string;
  status: string;
  floor: string;
  area: string;
  rooms: string;
  features: {
    balcony: boolean;
    terrace: boolean;
    wardrobe: boolean;
    separateKitchen: boolean;
  };
};

export default function AddProperty() {
  const [form, setForm] =
    useState<FormState>({
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

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
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

    await addDoc(
      collection(db, "properties"),
      result.data
    );

    alert("Dodano!");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ marginBottom: 20 }}
    >
      <h3>Dodaj nieruchomość</h3>

      <input
        name="title"
        placeholder="Tytuł"
        value={form.title}
        onChange={handleChange}
      />

      <input
        name="location"
        placeholder="Lokalizacja"
        value={form.location}
        onChange={handleChange}
      />

      <input
        name="price"
        placeholder="Cena"
        value={form.price}
        onChange={handleChange}
      />

      <button type="submit">Dodaj</button>
    </form>
  );
}