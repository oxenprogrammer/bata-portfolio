"use client";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { subscribeToNewsletter } from "@/app/api/newsletter";
import { Typography, Box, styled } from "@mui/material";
import { Toast } from ".";

const NewsletterInput = styled("input")(({ theme }) => ({
  padding: theme.spacing(1.5),
  border: "1px solid rgba(255, 255, 255, 0.2)", // Lighter border for dark mode
  borderRadius: theme.shape.borderRadius,
  marginRight: theme.spacing(1),
  [theme.breakpoints.down("md")]: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
  backgroundColor: theme.palette.background.default, // Dark background
  color: theme.palette.text.primary, // Text color for dark mode
  "&:focus": {
    outline: "none",
    borderColor: `${theme.palette.teal[80]} !important`,
  },
}));

const SubscribeButton = styled("button")(({ theme }) => ({
  padding: theme.spacing(1.5, 3),
  backgroundColor: `${theme.palette.teal[80]} !important`, // Teal color for button
  color: theme.palette.common.white,
  border: "none",
  [theme.breakpoints.down("md")]: {
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
  borderRadius: theme.shape.borderRadius,
  cursor: "pointer",
  transition: "background-color 0.2s ease-in-out",
  "&:hover": {
    backgroundColor: `${theme.palette.teal[60]} !important`,
  },
  "&:disabled": {
    backgroundColor: `${theme.palette.gray[60]} !important`,
    cursor: "not-allowed",
  },
}));

export const Newsletter = ({ sx }: { sx?: React.CSSProperties }) => {
  const [showToast, setShowToast] = useState(false);
  const [buttonState, setButtonState] = useState<
    "idle" | "loading" | "success"
  >("idle");

  const mutation = useMutation({
    mutationFn: subscribeToNewsletter,
    onMutate: () => {
      setButtonState("loading");
    },
    onSuccess: () => {
      setShowToast(true);
      setButtonState("success");
      setTimeout(() => {
        setShowToast(false);
      }, 5000);
    },
    onError: (error) => {
      console.error("Error subscribing to newsletter:", error);
      setButtonState("idle");
    },
  });

  const getButtonText = () => {
    switch (buttonState) {
      case "loading":
        return "Subscribing...";
      case "success":
        return "Subscribed";
      default:
        return "Subscribe";
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    mutation.mutate({
      email: formData.get("email") as string,
      name: formData.get("name") as string,
    });
  };

  return (
    <>
      {showToast && (
        <Toast
          message="Successfully subscribed to newsletter!"
          onClose={() => setShowToast(false)}
        />
      )}
      <Box
        sx={({ palette, borderRadii }) => ({
          textAlign: "center",
          py: "16px",
          maxWidth: 800,
          mx: "auto",
          mb: 4,
          backgroundColor: palette.background.default, // Dark mode background
          color: palette.text.primary, // Text color for dark mode
          border: `1px solid ${palette.teal[80]}`,
          borderRadius: borderRadii.xxl,
          ...sx,
        })}
      >
        <Typography
          variant="h4"
          component="h2"
          sx={({ palette }) => ({ color: palette.gray[20] })}
        >
          Join the Newsletter
        </Typography>
        <Typography sx={({ palette }) => ({ color: palette.text.secondary })}>
        Be the first to receive exclusive insights, expert opinions,
        </Typography>
        <Typography
          sx={({ palette }) => ({ mb: 3, color: palette.text.secondary })}
        >
          and updates on the latest trends in communications, mentorship branding, and business.
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            gap: 2,
            maxWidth: "600px",
            mx: "auto",
            mb: 2,
          }}
        >
          <NewsletterInput
            type="text"
            name="name"
            placeholder="Name (optional)"
            sx={{ flex: 1 }}
          />
          <NewsletterInput
            type="email"
            name="email"
            placeholder="Email Address"
            required
            sx={{ flex: 1 }}
          />
          <SubscribeButton
            type="submit"
            disabled={buttonState === "loading" || buttonState === "success"}
          >
            {getButtonText()}
          </SubscribeButton>
        </Box>

        <Typography
          sx={({ palette }) => ({ color: palette.text.secondary, mb: 4 })}
        >
          The newsletter brings you valuable content straight to your inbox—no spam, just impact.
        </Typography>
      </Box>
    </>
  );
};
