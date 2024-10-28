import { styled } from "@mui/system";
import Link from "next/link";
import { ReactNode } from "react";

interface SocialLinkProps {
  href: string;
  icon: ReactNode;
}

const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: "none",
  transition: "color 0.2s ease-in-out",
  "&:hover": {
    color: "#4DB6AC",
  },
}));

export const SocialLink = ({ href, icon }: SocialLinkProps) => {
  return (
    <StyledLink href={href} target="_blank" rel="noopener noreferrer">
      {icon}
    </StyledLink>
  );
};
