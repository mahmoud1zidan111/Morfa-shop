import React, { useEffect, useState } from "react";
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

// تقسيم آراي إلى مجموعات من 4
function chunk(arr, size = 1) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

// صورة بديلة
function placeholder(name) {
  return `https://via.placeholder.com/200x200.png?text=${encodeURIComponent(
    name || "Category"
  )}`;
}

export default function CategoryBlocks() {
  const [blocks, setBlocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const cats = await getAllCategories(); // [{id,name,imageUrl}]
        // اقسم التصنيفات إلى بلاطات (كل بلاطة 4 عناصر)
        const grouped = chunk(cats, 1);
        if (alive) setBlocks(grouped);
      } catch (e) {
        if (alive) setErr(e?.response?.data || e.message);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => (alive = false);
  }, []);

  return (
    <Box
      sx={{
        zIndex: 2,
        width: "100%",
        px: { xs: 2, md: 6 },
        py: 4,
        position: "relative",
        bottom: 330,
        overflow: "hidden",
      }}
    >
      {err && (
        <Box color="error.main" sx={{ textAlign: "center", mb: 1 }}>
          حصل خطأ أثناء تحميل التصنيفات: {String(err)}
        </Box>
      )}

      {/* شبكة البلاطات: 4 أعمدة على الشاشات الكبيرة */}
      <Grid container spacing={4}>
        {loading
          ? Array.from({ length: 8 }).map((_, i) => (
              <Grid item xs={12} sm={6} md={6} lg={4} key={i}>
                <Card sx={{ borderRadius: 2, border: "1px solid #e9ecef" }}>
                  <CardContent>
                    <Skeleton
                      variant="text"
                      width="60%"
                      height={28}
                      sx={{ mb: 2 }}
                    />
                    <Grid container spacing={2}>
                      {Array.from({ length: 4 }).map((__, j) => (
                        <Grid item xs={6} key={j}>
                          <Skeleton variant="rectangular" height={120} />
                          <Skeleton variant="text" width="80%" />
                        </Grid>
                      ))}
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            ))
          : blocks.map((group, idx) => (
              <Grid item xs={12} sm={6} md={6} lg={4} key={idx}>
                <Card
                  sx={{
                    borderRadius: 2,
                    border: "1px solid #e9ecef",
                    background: "#fff",
                  }}
                >
                  <CardContent>
                    {/* عنوان البلاطة - تقدر تغيره لأي نص تسويقي */}
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                      مختارات من التصنيفات
                    </Typography>

                    {/* شبكة 2×2 داخل البلاطة */}
                    <Grid container spacing={2}>
                      {group.map((cat) => (
                        <Grid item xs={6} key={cat.id}>
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
                              sx={{
                                width: "100%",
                                aspectRatio: "1 / 1",
                                objectFit: "cover",
                                borderRadius: 1.5,
                                border: "1px solid #eee",
                              }}
                            />
                            <Typography
                              variant="body2"
                              align="center"
                              sx={{ mt: 1, color: "text.primary" }}
                            >
                              {cat.name}
                            </Typography>
                          </Box>
                        </Grid>
                      ))}
                    </Grid>

                    {/* رابط أسفل البلاطة */}
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
              </Grid>
            ))}
      </Grid>
    </Box>
  );
}
