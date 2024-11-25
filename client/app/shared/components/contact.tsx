"use client";
import React from "react";
import { useMutation } from "@tanstack/react-query";
import { Typography, Box, styled } from "@mui/material";
import { contactApi } from "@/app/api/contact";
import { Toast } from ".";

const ContactInput = styled("input")(({ theme }) => ({
  padding: theme.spacing(1.5),
  border: "1px solid rgba(255, 255, 255, 0.2)",
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  "&:focus": {
    outline: "none",
    borderColor: `${theme.palette.teal[80]} !important`,
  },
}));

const ContactTextArea = styled("textarea")(({ theme }) => ({
  padding: theme.spacing(1.5),
  border: "1px solid rgba(255, 255, 255, 0.2)",
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  minHeight: "120px",
  resize: "vertical",
  fontFamily: "inherit",
  "&:focus": {
    outline: "none",
    borderColor: `${theme.palette.teal[80]} !important`,
  },
}));

const SubmitButton = styled("button")(({ theme }) => ({
  padding: theme.spacing(1.5, 3),
  backgroundColor: `${theme.palette.teal[80]} !important`, // Teal color for button
  color: theme.palette.common.white,
  border: "none",
  borderRadius: theme.shape.borderRadius,
  cursor: "pointer",
  transition: "background-color 0.2s ease-in-out",
  "&:hover": {
    backgroundColor: `${theme.palette.teal[60]} !important`,
  },
  "&:disabled": {
    backgroundColor: theme.palette.gray[60],
    cursor: "not-allowed",
  },
}));

export const Contact = ({ sx }: { sx?: React.CSSProperties }) => {
  const mutation = useMutation({
    mutationFn: contactApi,
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

  const [buttonState, setButtonState] = React.useState<
    "idle" | "loading" | "success"
  >("idle");
  const [showToast, setShowToast] = React.useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    mutation.mutate({
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      message: formData.get("message") as string,
      subject: formData.get("subject") as string,
    });
  };

  return (
    <>
      {showToast && (
        <Toast
          message="Thanks, we'll be in touch soon!"
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
          backgroundColor: palette.background.default, // Dark background
          color: palette.text.primary,
          border: `1px solid ${palette.teal[80]}`,
          borderRadius: borderRadii.xxl,
          ...sx,
        })}
      >
        <Typography
          variant="h4"
          component="h2"
          sx={({ palette }) => ({
            color: palette.gray[20],
            mb: 2,
          })}
        >
          Coffee!
        </Typography>
        <Typography
          sx={({ palette }) => ({
            color: palette.text.secondary, // Adjust for contrast in dark mode
            mb: 4,
          })}
        >
          Have a question or feedback? I&apos;d love to hear from you.
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "600px",
            mx: "auto",
            px: 2,
          }}
        >
          <ContactInput
            type="text"
            name="name"
            placeholder="Your Name"
            required
          />
          <ContactInput
            type="email"
            name="email"
            placeholder="Your Email"
            required
          />
          <ContactInput type="tel" name="phone" placeholder="Phone Number" />
          <ContactInput
            type="text"
            name="subject"
            placeholder="Subject"
            required
          />
          <ContactTextArea name="message" placeholder="Your Message" required />
          <SubmitButton
            type="submit"
            disabled={buttonState === "loading" || buttonState === "success"}
          >
            Send Message
          </SubmitButton>
        </Box>
      </Box>
    </>
  );
};
