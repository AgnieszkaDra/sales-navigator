import { useEffect, useState } from "react";
import { getProperties } from "./api/properties";
import type { Property } from "./types";

export const useProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProperties();
      setProperties(data as Property[]);
      setLoading(false);
    };

    fetchData();
  }, []);

  return { properties, loading };
};