export type Property = {
  id: string;

  title: string;
  location: string;
  price: number;

  status: "available" | "reserved" | "sold";
  floor: string;
  area: number;
  rooms: number;

  features: {
    balcony: boolean;
    terrace: boolean;
    wardrobe: boolean;
    separateKitchen: boolean;
  };
};