import React, { useEffect } from "react";
import { getProductById } from "./api/productsApi";

export default function Check() {
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getProductById(1, {
          CategoryId: 1,
          PageNumber: 0,
          CountOfItems: 4,
        });
        console.log("Product data:", data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    }

    fetchData();
  }, []);

  return <div style={{ padding: 100 }}> TEST API ..... </div>;
}
