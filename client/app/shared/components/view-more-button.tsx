import { Button, styled } from "@mui/material";
import Link from "next/link";

const ViewMoreButton = styled(Button)(({ theme }) => ({
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

  export const ViewMoreButtonComponent: React.FC<{ link: string }> = ({ link }) => {
    return (
        <Link href={link} style={{ textDecoration: 'none' }}>
          <ViewMoreButton disableElevation>
            VIEW MORE
          </ViewMoreButton>
        </Link>
    );
  };