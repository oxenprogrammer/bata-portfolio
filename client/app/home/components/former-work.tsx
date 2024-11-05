"use client";
import { InfiniteCarousel } from "@/app/shared/components";
import {
  BMWIcon,
  SamsungIcon,
  MasterCardFoundationIcon,
  MoIbrahimFoundationIcon,
} from "@/app/shared/icons";
import { Box, styled, Typography } from "@mui/material";

const images = [
  <BMWIcon
    key="bmw"
    sx={{
      width: {
        xs: "98px",
        md: "196px",
      },
      height: {
        xs: "98px",
        md: "196px",
      },
    }}
  />,
  <SamsungIcon key="samsung"  sx={{
    width: {
      xs: "98px",
      md: "390px",
    },
    height: {
      xs: "98px",
      md: "128px",
    },
  }} />,
  <MasterCardFoundationIcon
    key="mastercard"
    sx={{
        width: {
          xs: "157px",
          md: "314px",
        },
        height: {
          xs: "98px",
          md: "196px",
        },
      }}
  />,
  <MoIbrahimFoundationIcon
    key="moibrahim"
    sx={{
        width: {
          xs: "145px",
          md: "290px",
        },
        height: {
          xs: "98px",
          md: "196px",
        },
      }}
  />,
];

const CarouselWrapper = styled(Box)(() => ({
  position: "relative",
  margin: "auto",
  width: "100%",
  maxWidth: "1232px",
  overflow: "hidden",
}));

const GradientOverlay = styled(Box)(
  ({ direction }: { direction: "left" | "right" }) => ({
    position: "absolute",
    top: 0,
    bottom: 0,
    width: "64px",
    zIndex: 10,
    ...(direction === "left"
      ? {
          left: 0,
          background: "linear-gradient(to right, #F9FAFB, transparent)",
        }
      : {
          right: 0,
          background: "linear-gradient(to left, #F9FAFB, transparent)",
        }),
  })
);

export const FormerWorkSection = () => {
  return (
    <Box
      sx={({ palette }) => ({
        backgroundColor: palette.gray[5],
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      })}
    >
      <Typography
        sx={{
          color: "#7C6F6F",
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          fontWeight: 700,
          fontSize: {
            xs: "32px",
            md: "44px",
          },
          py: "16px",
        }}
      >
        Organizations I have Journeyed with
      </Typography>
      <CarouselWrapper>
        <GradientOverlay direction="left" />
        <GradientOverlay direction="right" />
        <InfiniteCarousel images={images} />
      </CarouselWrapper>
    </Box>
  );
};
