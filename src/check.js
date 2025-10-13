// src/Check.js
import React, { useEffect, useRef, useState } from "react";
import axiosInstance from "./api/axiosInstance";

export default function Check() {
  const [items, setItems] = useState([]);
  const [err, setErr] = useState(null);
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    const ids = [1, 2, 3, 4, 5, 6]; // حط IDs اللي عايزها

    (async () => {
      try {
        const results = await Promise.allSettled(
          ids.map((id) =>
            axiosInstance.get(`/Products/${id}`, {
              params: { CategoryId: 1, PageNumber: 2, CountOfItems: 4 },
            })
          )
        );

        const ok = results
          .filter((r) => r.status === "fulfilled")
          .map((r) => r.value.data);

        const failed = results.filter((r) => r.status === "rejected");
        if (failed.length) {
          console.warn("Failed requests:", failed.length);
        }

        console.log("Products list:", ok);
        setItems(ok);
      } catch (e) {
        console.error("Batch error:", e?.response?.data || e.message);
        setErr(e?.response?.data || e.message);
      }
    })();
  }, []);

  return (
    <div style={{ marginTop: 100, padding: 20 }}>
      <h3>Check console</h3>
      <pre dir="ltr">
        {items.length
          ? JSON.stringify(items, null, 2)
          : err
          ? String(err)
          : "Loading..."}
      </pre>
    </div>
  );
}
