import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../componants/steyles-comonant/card.css";

// get all potho
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
  const { t } = useTranslation();

  const cards = [
    {
      id: 1,
      title: t("computer_accessories"),
      images: [
        { src: ca1, tit: "keyboard", link: "/products/computer-accessories/1" },
        { src: ca2, tit: "mouse", link: "/products/computer-accessories/2" },
        { src: ca3, tit: "camera", link: "/products/computer-accessories/3" },
        { src: ca4, tit: "usb hub", link: "/products/computer-accessories/4" },
      ],
    },
    {
      id: 2,
      title: t("electrical_appliances"),
      images: [
        { src: ea1, tit: "fan", link: "/products/electrical-appliances/1" },
        { src: ea2, tit: "fridge", link: "/products/electrical-appliances/2" },
        { src: ea3, tit: "tv", link: "/products/electrical-appliances/3" },
        {
          src: ea4,
          tit: "microwave",
          link: "/products/electrical-appliances/4",
        },
      ],
    },
    {
      id: 3,
      title: t("watches"),
      images: [
        { src: w1, tit: "watch 1", link: "/products/watches/1" },
        { src: w2, tit: "watch 2", link: "/products/watches/2" },
        { src: w3, tit: "watch 3", link: "/products/watches/3" },
        { src: w4, tit: "watch 4", link: "/products/watches/4" },
      ],
    },
    {
      id: 4,
      title: t("computers_laptops"),
      images: [
        { src: cl1, tit: "laptop 1", link: "/products/computers/1" },
        { src: cl2, tit: "laptop 2", link: "/products/computers/2" },
        { src: cl3, tit: "laptop 3", link: "/products/computers/3" },
        { src: cl4, tit: "laptop 4", link: "/products/computers/4" },
      ],
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "nowrap",
        gap: 2,
        p: 5.5,
        justifyContent: "center",
      }}
    >
      {cards.map((card) => (
        <Card
          key={card.id}
          sx={{
            width: 300,
            overflow: "hidden",
            marginTop: "-330px",
            zIndex: "10",
          }}
        >
          <CardContent>
            <Typography gutterBottom variant="h6" align="center">
              {card.title}
            </Typography>

            <ImageList cols={2} gap={8}>
              {card.images.map((img, idx) => (
                <ImageListItem
                  key={idx}
                  sx={{ cursor: "pointer", overflow: "hidden" }}
                  onClick={() => navigate(img.link)}
                >
                  <img
                    src={img.src}
                    alt={img.tit}
                    loading="lazy"
                    style={{
                      width: "100%",
                      aspectRatio: "1 / 1",
                      objectFit: "cover",
                      borderRadius: 3,
                      transition:
                        "transform 0.3s ease,  0.3s ease, opacity 0.6s",
                      opacity: 0.9,
                    }}
                    className="image-item"
                  />
                  <ImageListItemBar
                    title={img.tit}
                    position="below"
                    sx={{
                      ".MuiImageListItemBar-title": {
                        fontSize: "0.8rem",
                        textAlign: "center",
                      },
                    }}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
