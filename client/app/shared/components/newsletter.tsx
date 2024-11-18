"use client";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { subscribeToNewsletter } from "@/app/api/newsletter";
import Link from "next/link";
import { Typography, Box, styled } from "@mui/material";
import { Toast } from ".";

const NewsletterInput = styled("input")(({ theme }) => ({
  padding: theme.spacing(1.5),
  border: "1px solid rgba(0, 0, 0, 0.12)",
  borderRadius: theme.shape.borderRadius,
  marginRight: theme.spacing(1),
  backgroundColor: theme.palette.white,
  color: theme.palette.gray[90],
  "&:focus": {
    outline: "none",
    borderColor: theme.palette.primary.main,
  },
}));

const SubscribeButton = styled("button")(({ theme }) => ({
  padding: theme.spacing(1.5, 3),
  backgroundColor: "#4DB6AC",
  color: theme.palette.common.white,
  border: "none",
  borderRadius: theme.shape.borderRadius,
  cursor: "pointer",
  transition: "background-color 0.2s ease-in-out",
  "&:hover": {
    backgroundColor: "#3b9c90",
  },
}));

export const Newsletter = ({ sx }: { sx?: React.CSSProperties }) => {
  const [showToast, setShowToast] = useState(false);
  const [buttonState, setButtonState] = useState<'idle' | 'loading' | 'success'>('idle');

  const mutation = useMutation({
    mutationFn: subscribeToNewsletter,
    onMutate: () => {
      setButtonState('loading');
    },
    onSuccess: () => {
      setShowToast(true);
      setButtonState('success');
      setTimeout(() => {
        setShowToast(false);
      }, 5000);
    },
    onError: (error) => {
      console.error("Error subscribing to newsletter:", error);
      setButtonState('idle');
    },
  });

  const getButtonText = () => {
    switch (buttonState) {
      case 'loading':
        return 'Subscribing...';
      case 'success':
        return 'Subscribed';
      default:
        return 'Subscribe';
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
        sx={({ palette }) => ({
          textAlign: "center",
          py: "16px",
          maxWidth: 800,
          mx: "auto",
          mb: 4,
          backgroundColor: palette.white,
          ...sx,
        })}
      >
        <Typography
          variant="h4"
          component="h2"
          sx={({ palette }) => ({ color: palette.primary.main })}
        >
          Join the Newsletter
        </Typography>
        <Typography sx={({ palette }) => ({ color: palette.gray[80] })}>
          Subscribe to receive regular updates on new products, articles, and
          courses.
        </Typography>
        <Typography sx={({ palette }) => ({ mb: 3, color: palette.gray[80] })}>
          Want to receive free Sepolia ETH for this? Visit{" "}
          <Link
            href="/faucet"
            style={{ color: "#4DB6AC", textDecoration: "none" }}
          >
            the faucet
          </Link>{" "}
          after confirming your subscription.
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
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
            disabled={buttonState === 'loading' || buttonState === 'success'}
          >
            {getButtonText()}
          </SubscribeButton>
        </Box>

        <Typography sx={({ palette }) => ({ color: palette.gray[80], mb: 4 })}>
          We won&apos;t send you spam. Unsubscribe at any time.
        </Typography>
      </Box>
    </>
  );
};
