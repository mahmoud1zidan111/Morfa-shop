import React, { useEffect, useRef, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import axiosInstance from "./api/axiosInstance";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Button,
} from "@mui/material";

const PAGE_SIZE = 4;
const MAX_PAGES = 50;

export default function CategoryProducts() {
  const { id: idFromPath } = useParams();
  const [search] = useSearchParams();
  const categoryId = Number(idFromPath || search.get("categoryId") || 1);

  const [items, setItems] = useState([]);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const [ready, setReady] = useState(false);
  const sentinelRef = useRef(null);
  const fetchingRef = useRef(false);
  const seenIdsRef = useRef(new Set());

  const getId = (p) => p?.id || p?.productId || p?.Id || p?.ProductId;

  useEffect(() => {
    setItems([]);
    setPage(0);
    setHasMore(true);
    setErr(null);
    setReady(false);
    seenIdsRef.current.clear();
  }, [categoryId]);

  useEffect(() => {
    let aborted = false;
    const load = async () => {
      if (!hasMore || loading || fetchingRef.current) return;
      setLoading(true);
      fetchingRef.current = true;
      try {
        const res = await axiosInstance.get(`/Products`, {
          params: {
            CategoryId: categoryId,
            PageNumber: page,
            CountOfItems: PAGE_SIZE,
          },
          headers: { "x-skip-auth": true },
        });
        if (aborted) return;

        const list = Array.isArray(res.data) ? res.data : res.data?.items ?? [];
        const unique = list.filter((p) => {
          const id = getId(p);
          if (id == null) return true;
          if (seenIdsRef.current.has(id)) return false;
          seenIdsRef.current.add(id);
          return true;
        });

        setItems((prev) => [...prev, ...unique]);

        if (page === 0) setReady(true);
        if (
          unique.length === 0 ||
          list.length < PAGE_SIZE ||
          page + 1 >= MAX_PAGES
        ) {
          setHasMore(false);
        }
      } catch (e) {
        if (!aborted) setErr(e?.response?.data || e.message);
      } finally {
        if (!aborted) {
          setLoading(false);
          fetchingRef.current = false;
        }
      }
    };
    load();
    return () => {
      aborted = true;
    };
  }, [categoryId, page, hasMore, loading]);

  useEffect(() => {
    if (!ready || !hasMore) return;
    const el = sentinelRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && !loading && !fetchingRef.current) {
          setPage((p) => p + 1);
        }
      },
      { root: null, rootMargin: "300px", threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ready, hasMore, loading]);

  return (
    <Box p={3}>
      <Typography variant="h5" gutterBottom>
        Products in category #{categoryId}
      </Typography>
      {err && (
        <Box mb={2} color="error.main">
          حصل خطأ: {String(err)}
        </Box>
      )}

      <Grid container spacing={2}>
        {items.map((p, idx) => (
          <Grid item xs={12} sm={6} md={3} key={`${getId(p) ?? idx}-${idx}`}>
            <Card>
              <CardContent>
                <Typography variant="subtitle1" gutterBottom>
                  {p.name || `Product #${getId(p) ?? idx}`}
                </Typography>
                <Typography color="text.secondary">
                  السعر: {p.price ?? "-"}
                </Typography>
                <Typography color="text.secondary">
                  المتوفر: {p.count ?? "-"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box ref={sentinelRef} sx={{ height: 1 }} />
      <Box mt={2} display="flex" justifyContent="center">
        {loading && <CircularProgress size={28} />}
      </Box>
      {!loading && hasMore && (
        <Box mt={2} textAlign="center">
          <Button variant="outlined" onClick={() => setPage((p) => p + 1)}>
            تحميل المزيد
          </Button>
        </Box>
      )}
      {!hasMore && !loading && items.length > 0 && (
        <Box mt={2} textAlign="center" color="text.secondary">
          لا يوجد المزيد
        </Box>
      )}
    </Box>
  );
}
