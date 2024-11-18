"use client";
import React from "react";
import { useMutation } from "@tanstack/react-query";
import { Typography, Box, styled } from "@mui/material";
import { contactApi } from "@/app/api/contact";
import { Toast } from ".";

const ContactInput = styled("input")(({ theme }) => ({
  padding: theme.spacing(1.5),
  border: "1px solid rgba(0, 0, 0, 0.12)",
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(2),
  backgroundColor: theme.palette.white,
  color: theme.palette.gray[90],
  "&:focus": {
    outline: "none",
    borderColor: theme.palette.primary.main,
  },
}));

const ContactTextArea = styled("textarea")(({ theme }) => ({
  padding: theme.spacing(1.5),
  border: "1px solid rgba(0, 0, 0, 0.12)",
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(2),
  backgroundColor: theme.palette.white,
  color: theme.palette.gray[90],
  minHeight: "120px",
  resize: "vertical",
  fontFamily: "inherit",
  "&:focus": {
    outline: "none",
    borderColor: theme.palette.primary.main,
  },
}));

const SubmitButton = styled("button")(({ theme }) => ({
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
          sx={({ palette }) => ({ color: palette.primary.main, mb: 2 })}
        >
          Coffee!
        </Typography>
        <Typography sx={({ palette }) => ({ color: palette.gray[80], mb: 4 })}>
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
