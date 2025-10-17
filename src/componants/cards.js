import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Link as MuiLink,
  Skeleton,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { getAllCategories } from "../api/categoriesApi";
import RevealFromCenter from "./RevealFromCenter"; // ← المسار حسب مكان الملف

function chunk(arr, size = 1) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

function placeholder(name) {
  return `https://via.placeholder.com/200x200.png?text=${encodeURIComponent(
    name || "Category"
  )}`;
}

export default function CategoryBlocks() {
  const [blocks, setBlocks] = useState([]); // كل block = عنصر واحد (كارت منفصل)
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  const [visibleCount, setVisibleCount] = useState(4); // نبدأ بـ 4 كروت
  const sentinelRef = useRef(null);
  const loadingMoreRef = useRef(false); // حراسة ضد التكرار السريع

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const cats = await getAllCategories(); // [{id,name,imageUrl}]
        const grouped = chunk(cats, 1); // كروت منفصلة
        if (alive) {
          setBlocks(grouped);
          setVisibleCount(Math.min(4, grouped.length));
        }
      } catch (e) {
        if (alive) setErr(e?.response?.data || e.message);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => (alive = false);
  }, []);

  // زيادة 4 كروت لما السنتينل يوصل لنص الصفحة
  useEffect(() => {
    if (loading) return;
    const el = sentinelRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loadingMoreRef.current) {
          loadingMoreRef.current = true;
          setVisibleCount((prev) => Math.min(prev + 4, blocks.length));
          // مهلة صغيرة قبل السماح بزيادة تانية
          setTimeout(() => {
            loadingMoreRef.current = false;
          }, 250);
        }
      },
      {
        root: null,
        rootMargin: "-45% 0px -45% 0px", // نفس منطق النص
        threshold: 0.01,
      }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [blocks.length, loading]);

  const itemsToRender = blocks.slice(0, visibleCount);

  // مزامنة WOW لو لسه شغّال معاك على عناصر تانية
  useEffect(() => {
    window.__wow?.sync?.();
  }, [visibleCount]);

  return (
    <Box
      sx={{
        zIndex: 2,
        width: "100%",
        px: { xs: 2, md: 6 },
        py: 4,
        position: "relative",
        bottom: 310,
        overflow: "hidden",
      }}
    >
      {err && (
        <Box color="error.main" sx={{ textAlign: "center", mb: 1 }}>
          حصل خطأ أثناء تحميل التصنيفات: {String(err)}
        </Box>
      )}

      <Grid container spacing={7}>
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
              <Grid item xs={12} sm={6} md={6} lg={4} key={i}>
                <Card sx={{ borderRadius: 2, border: "1px solid #e9ecef" }}>
                  <CardContent>
                    <Skeleton
                      variant="text"
                      width="60%"
                      height={28}
                      sx={{ mb: 2 }}
                    />
                    <Skeleton variant="rectangular" height={160} />
                  </CardContent>
                </Card>
              </Grid>
            ))
          : itemsToRender.map((group, idx) => (
              <Grid item xs={12} sm={6} md={6} lg={4} key={idx}>
                <RevealFromCenter
                  animation="animate__fadeInUp"
                  duration="0.6s"
                  delay={(idx % 4) * 0.08} // ستاجر داخل كل دفعة 4
                >
                  <Card
                    sx={
                      {
                        // borderRadius: 2,
                        // border: "1px solid #e9ecef",
                        // background: "#fff",
                      }
                    }
                  >
                    <CardContent>
                      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                        مختارات من التصنيفات
                      </Typography>

                      <Grid container spacing={2}>
                        {group.map((cat) => (
                          <Grid item xs={12} key={cat.id}>
                            <Box
                              component={RouterLink}
                              to={`/categories/${cat.id}`}
                              sx={{
                                textDecoration: "none",
                                color: "inherit",
                                display: "block",
                              }}
                            >
                              <Box
                                component="img"
                                src={cat.imageUrl || placeholder(cat.name)}
                                alt={cat.name}
                                loading="lazy"
                                style={{
                                  width: "200px",
                                  aspectRatio: "1 / 1",
                                  objectFit: "cover",
                                  borderRadius: 12,
                                  border: "1px solid #eee",
                                }}
                              />
                              <Typography
                                variant="body2"
                                align="center"
                                sx={{ mt: 1 }}
                              >
                                {cat.name}
                              </Typography>
                            </Box>
                          </Grid>
                        ))}
                      </Grid>

                      <Box sx={{ mt: 2, textAlign: "start" }}>
                        <MuiLink
                          component={RouterLink}
                          to="/categories"
                          sx={{ fontWeight: 600 }}
                        >
                          شاهد المزيد
                        </MuiLink>
                      </Box>
                    </CardContent>
                  </Card>
                </RevealFromCenter>
              </Grid>
            ))}
      </Grid>

      {/* السنتينل: يظهر 4 كروت إضافية لما يوصل لنص الشاشة */}
      {!loading && visibleCount < blocks.length && (
        <div ref={sentinelRef} style={{ height: 0.5, marginTop: 300 }} />
      )}
    </Box>
  );
}
