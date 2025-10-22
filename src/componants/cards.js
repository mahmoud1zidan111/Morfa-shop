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
import RevealFromCenter from "./RevealFromCenter";

const VISUAL_LIFT = 310; // نفس القيمة اللي كنت مستخدمها في bottom

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
  const [blocks, setBlocks] = useState([]); // كل block = عنصر واحد
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  const [visibleCount, setVisibleCount] = useState(4);
  const sentinelRef = useRef(null);
  const loadingMoreRef = useRef(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const cats = await getAllCategories();
        const grouped = chunk(cats, 1);
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

  // حمّل 4 كروت إضافية لما نقرّب من أسفل الصفحة
  useEffect(() => {
    if (loading) return;
    const el = sentinelRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loadingMoreRef.current) {
          loadingMoreRef.current = true;
          setVisibleCount((prev) => Math.min(prev + 4, blocks.length));
          setTimeout(() => (loadingMoreRef.current = false), 100);
        }
      },
      {
        root: null,
        rootMargin: "0px 0px 10% 0px", // فعّل التحميل قبل ما نوصل للآخر
        threshold: 0,
      }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [blocks.length, loading]);

  const itemsToRender = blocks.slice(0, visibleCount);

  return (
    <Box
      className="container-card"
      sx={{
        zIndex: 2,
        display: "flex",
        flexDirection: "row",
        py: { xs: 24, sm: 21, md: 10, lg: 2 },
        // mt: VISUAL_LIFT, // نحافظ على مساحة في التدفق
        overflow: "visible", // عشان الأنيميشن ما تتقصّش
      }}
    >
      {/* نرفع المحتوى بصريًا فقط */}
      <Box sx={{ transform: `translateY(-${VISUAL_LIFT}px)` }}>
        {err && (
          <Box color="error.main" sx={{ textAlign: "center", mb: 1 }}>
            حصل خطأ أثناء تحميل التصنيفات: {String(err)}
          </Box>
        )}

        <Grid
          container
          spacing={{ xs: 2, sm: 4, md: 6 }}
          justifyContent="center"
        >
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
                <Grid item xs={6} sm={6} md={6} lg={4} key={i}>
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
                <Grid item xs={6} sm={6} md={6} lg={4} key={idx}>
                  <RevealFromCenter
                    animation="animate__fadeInUp"
                    duration="0.6s"
                    delay={(idx % 4) * 0.08}
                  >
                    <Card>
                      <CardContent>
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: 700, mb: 2 }}
                        >
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
                                    zIndex: 1,
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
      </Box>

      {/* السنتينل خارج الصندوق المتحوّل — علشان التحميل يشتغل صح */}
      {!loading && visibleCount < blocks.length && (
        <div ref={sentinelRef} style={{ height: 2 }} />
      )}
    </Box>
  );
}
