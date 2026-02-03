"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface Pet {
  id: string;
  name: string;
  breed: string;
  age: string;
  bio: string;
  status: "Available" | "On Hold" | "Adopted";
  location?: string;
  images: string[];
}

export function usePets() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPets() {
      try {
        const snapshot = await getDocs(collection(db, "pets"));
        const data = snapshot.docs.map((doc) => doc.data() as Pet);
        setPets(data);
      } catch (error) {
        console.error("Error fetching pets", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPets();
  }, []);

  return { pets, loading };
}
