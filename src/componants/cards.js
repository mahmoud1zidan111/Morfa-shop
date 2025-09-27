import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"; // ✅ استدعاء الترجمة

// ✅ استيراد الصور
import ca1 from "../image/Product groups/Computer accessories/612LxAJyzXL._AC_SL1500_.jpg";
import ca2 from "../image/Product groups/Computer accessories/619DIEev8fL._AC_SL1500_.jpg";
import ca3 from "../image/Product groups/Computer accessories/61MC8BK0w0L._AC_SL1500_.jpg";
import ca4 from "../image/Product groups/Computer accessories/61OPT75VFNL._AC_SL1500_.jpg";

import ea1 from "../image/Product groups/electrical appliances/41bkXo-MSnL._AC_SL1000_.jpg";
import ea2 from "../image/Product groups/electrical appliances/61a+80By0tL._AC_SL1000_.jpg";
import ea3 from "../image/Product groups/electrical appliances/61GNlJ+GzQL._AC_SL1500_.jpg";
import ea4 from "../image/Product groups/electrical appliances/61ixroTFTYL._AC_SL1500_.jpg";

import w1 from "../image/Product groups/hours/610+ZVvJlgL._AC_SX679_.jpg";
import w2 from "../image/Product groups/hours/61z1Anl4kVL._AC_SL1500_.jpg";
import w3 from "../image/Product groups/hours/71q4qoHORGL._AC_SY675_.jpg";
import w4 from "../image/Product groups/hours/71QxcGFeynL._AC_SY675_.jpg";

import cl1 from "../image/Product groups/Computers&labtobs/71up+hmd7zL._AC_SL1500_.jpg";
import cl2 from "../image/Product groups/Computers&labtobs/71z2lEHwfNL._AC_SL1500_.jpg";
import cl3 from "../image/Product groups/Computers&labtobs/71zuMSjwDfL._AC_SL1500_.jpg";
import cl4 from "../image/Product groups/Computers&labtobs/81dr15aerZL._AC_SL1500_.jpg";

export default function ActionAreaCard() {
  const navigate = useNavigate();
  const { t } = useTranslation(); // ✅

  const cards = [
    {
      id: 1,
      title: t("computer_accessories"),
      images: [
        { src: ca1, link: "/products/computer-accessories/1" },
        { src: ca2, link: "/products/computer-accessories/2" },
        { src: ca3, link: "/products/computer-accessories/3" },
        { src: ca4, link: "/products/computer-accessories/4" },
      ],
    },
    {
      id: 2,
      title: t("electrical_appliances"),
      images: [
        { src: ea1, link: "/products/electrical-appliances/1" },
        { src: ea2, link: "/products/electrical-appliances/2" },
        { src: ea3, link: "/products/electrical-appliances/3" },
        { src: ea4, link: "/products/electrical-appliances/4" },
      ],
    },
    {
      id: 3,
      title: t("watches"),
      images: [
        { src: w1, link: "/products/watches/1" },
        { src: w2, link: "/products/watches/2" },
        { src: w3, link: "/products/watches/3" },
        { src: w4, link: "/products/watches/4" },
      ],
    },
    {
      id: 4,
      title: t("computers_laptops"),
      images: [
        { src: cl1, link: "/products/computers/1" },
        { src: cl2, link: "/products/computers/2" },
        { src: cl3, link: "/products/computers/3" },
        { src: cl4, link: "/products/computers/4" },
      ],
    },
  ];

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, p: 5.5 }}>
      {cards.map((card) => (
        <Card key={card.id} sx={{ width: 283 }}>
          <CardContent>
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              align="center"
            >
              {card.title}
            </Typography>
            <Grid container spacing={2}>
              {card.images.map((img, idx) => (
                <Grid item xs={6} key={idx}>
                  <Box
                    component="img"
                    src={img.src}
                    alt={card.title + idx}
                    onClick={() => navigate(img.link)}
                    sx={{
                      width: "95%",
                      height: 70,
                      objectFit: "cover",
                      borderRadius: 1,
                      cursor: "pointer",
                      transition: "0.4s",
                      "&:hover": { transform: "scale(1.04)" },
                    }}
                  />
                </Grid>
              ))}
            </Grid>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
