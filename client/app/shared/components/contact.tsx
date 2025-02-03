"use client";
import { CSSProperties, FormEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Typography, Box, styled } from "@mui/material";
import { contactApi } from "@/app/api/contact";
import { Toast } from ".";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { debounce } from "@/app/shared/utils/debounce";

const ContactInput = styled("input")<{ error?: boolean }>(({ theme, error }) => ({
  padding: theme.spacing(1.5),
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  border: error ? `1px solid ${theme.palette.error.main}` : "1px solid rgba(255, 255, 255, 0.2)",
  "&:focus": {
    outline: "none",
    borderColor: error
      ? theme.palette.error.main
      : `${theme.palette.teal[80]} !important`,
  },
}));

const ContactTextArea = styled("textarea")<{ error?: boolean }>(({ theme, error }) => ({
  padding: theme.spacing(1.5),
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  minHeight: "120px",
  resize: "vertical",
  fontFamily: "inherit",
  border: error ? `1px solid ${theme.palette.error.main}` : "1px solid rgba(255, 255, 255, 0.2)",
  "&:focus": {
    outline: "none",
    borderColor: error
      ? theme.palette.error.main
      : `${theme.palette.teal[80]} !important`,
  },
}));

const SubmitButton = styled("button")(({ theme }) => ({
  padding: theme.spacing(1.5, 3),
  backgroundColor: `${theme.palette.teal[80]} !important`,
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

export const Contact = ({ sx }: { sx?: CSSProperties }) => {
  const [phone, setPhone] = useState("");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});
  const [submitError, setSubmitError] = useState<string>("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [buttonState, setButtonState] = useState<"idle" | "loading" | "success">("idle");
  const [showToast, setShowToast] = useState(false);

  const debouncedValidation = debounce((formData: FormData) => {
    validateField(formData);
  }, 300);

  const isValid = (formData: FormData): boolean => {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const subject = formData.get("subject") as string;
    const message = formData.get("message") as string;

    return (
      name?.length >= 2 &&
      email?.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) !== null &&
      phone?.length > 0 &&
      subject?.length >= 3 &&
      message?.length >= 10
    );
  };

  const validateForm = (formData: FormData) => {
    const errors: Record<string, string> = {};

    Object.keys(touchedFields).forEach(field => {
      if (!touchedFields[field]) return;

      switch(field) {
        case 'email':
          const email = formData.get("email") as string;
          if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            errors.email = "Please enter a valid email address";
          }
          break;
        case 'name':
          const name = formData.get("name") as string;
          if (name.length < 2) {
            errors.name = "Name must be at least 2 characters long";
          }
          break;
        case 'message':
          const message = formData.get("message") as string;
          if (message.length < 10) {
            errors.message = "Message must be at least 10 characters long";
          }
          break;
        case 'subject':
          const subject = formData.get("subject") as string;
          if (subject.length < 3) {
            errors.subject = "Subject must be at least 3 characters long";
          }
          break;
        case 'phone':
          if (!phone) {
            errors.phone = "Phone number is required";
          }
          break;
      }
    });

    return errors;
  };

  const validateField = (formData: FormData) => {
    const errors = validateForm(formData);
    setFormErrors(errors);
    setIsFormValid(isValid(formData));
  };

  const handleBlur = (fieldName: string) => {
    setTouchedFields(prev => ({
      ...prev,
      [fieldName]: true
    }));
    const form = document.querySelector('form');
    if (form) {
      validateField(new FormData(form));
    }
  };

  const handlePhoneChange = (value: string) => {
    setPhone(value);
    setTouchedFields(prev => ({
      ...prev,
      phone: true
    }));
    const form = document.querySelector('form');
    if (form) {
      validateField(new FormData(form));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const form = e.target.form;
    if (form) {
      setTouchedFields(prev => ({
        ...prev,
        [e.target.name]: true
      }));
      debouncedValidation(new FormData(form));
    }
  };

  const mutation = useMutation({
    mutationFn: contactApi,
    onMutate: () => {
      setButtonState("loading");
      setSubmitError("");
    },
    onSuccess: () => {
      setShowToast(true);
      setButtonState("success");
      setFormErrors({});
      setSubmitError("");
      setTimeout(() => {
        setShowToast(false);
      }, 5000);
    },
    onError: (error: any) => {
      setButtonState("idle");
      setSubmitError(error.message || "Failed to send message. Please try again.");
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const allFields = ['name', 'email', 'phone', 'subject', 'message'];
    setTouchedFields(allFields.reduce((acc, field) => ({ ...acc, [field]: true }), {}));

    const errors = validateForm(formData);
    setFormErrors(errors);
    setIsFormValid(isValid(formData));

    if (Object.keys(errors).length === 0) {
      mutation.mutate({
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        phone: phone,
        message: formData.get("message") as string,
        subject: formData.get("subject") as string,
      });
    }
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
          backgroundColor: palette.background.default,
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
          Coffee?
        </Typography>
        <Typography
          sx={({ palette }) => ({
            color: palette.text.secondary,
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
            onBlur={() => handleBlur('name')}
            onChange={handleInputChange}
            error={touchedFields.name && !!formErrors.name}
          />
          {touchedFields.name && formErrors.name && (
            <Typography color="error" sx={{ mb: 1 }}>
              {formErrors.name}
            </Typography>
          )}

          <ContactInput
            type="email"
            name="email"
            placeholder="Your Email"
            required
            onBlur={() => handleBlur('email')}
            onChange={handleInputChange}
            error={touchedFields.email && !!formErrors.email}
          />
          {touchedFields.email && formErrors.email && (
            <Typography color="error" sx={{ mb: 1 }}>
              {formErrors.email}
            </Typography>
          )}

          <PhoneInput
            country={'ug'}
            value={phone}
            onChange={handlePhoneChange}
            onBlur={() => handleBlur('phone')}
            inputProps={{
              name: 'phone',
              required: true,
            }}
            containerStyle={{
              width: '100%',
              marginBottom: '16px',
              display: 'flex',
              alignItems: 'center'
            }}
            inputStyle={{
              width: '100%',
              height: '48px',
              backgroundColor: 'transparent',
              border: touchedFields.phone && formErrors.phone
                ? '1px solid #f44336'
                : '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '4px',
              color: '#fff',
              padding: '12px 12px 12px 50px'
            }}
            buttonStyle={{
              backgroundColor: 'transparent',
              border: '1px solid rgba(255, 255, 255, 0)',
              borderRight: 'none',
              borderRadius: '4px 0 0 4px',
            }}
            dropdownStyle={{
              backgroundColor: '#12181E',
              color: '#fff',
              textAlign: 'left'
            }}
            searchStyle={{
              backgroundColor: '#12181E',
              color: '#fff'
            }}
            countryCodeEditable={false}
            enableSearch={true}
            dropdownClass="custom-dropdown"
          />
          {touchedFields.phone && formErrors.phone && (
            <Typography color="error" sx={{ mb: 1 }}>
              {formErrors.phone}
            </Typography>
          )}

          <ContactInput
            type="text"
            name="subject"
            placeholder="Subject"
            required
            onBlur={() => handleBlur('subject')}
            onChange={handleInputChange}
            error={touchedFields.subject && !!formErrors.subject}
          />
          {touchedFields.subject && formErrors.subject && (
            <Typography color="error" sx={{ mb: 1 }}>
              {formErrors.subject}
            </Typography>
          )}

          <ContactTextArea
            name="message"
            placeholder="Your Message"
            required
            onBlur={() => handleBlur('message')}
            onChange={handleInputChange}
          />
          {touchedFields.message && formErrors.message && (
            <Typography color="error" sx={{ mb: 1 }}>
              {formErrors.message}
            </Typography>
          )}

          {submitError && (
            <Typography color="error" sx={{ mb: 2 }}>
              {submitError}
            </Typography>
          )}

          <SubmitButton
            type="submit"
            disabled={buttonState === "loading" || buttonState === "success" || !isFormValid}
          >
            {buttonState === "loading" ? "Sending..." : "Send Message"}
          </SubmitButton>
        </Box>
      </Box>
    </>
  );
};
