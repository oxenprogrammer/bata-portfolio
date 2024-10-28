"use client";
import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';
import { styled } from '@mui/system';
import { EmailIcon, LinkedInIcon, TwitterIcon } from '@/app/shared/icons';

const AboutContainer = styled(Container)(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(12, 2),
  overflow: 'hidden',
}));

const BackgroundText = styled(Typography)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(6),
  left: "7px",
  fontSize: '120px',
  fontWeight: 700,
  opacity: 0.2,
  color: theme.palette.gray[60],
  whiteSpace: 'nowrap',
  userSelect: 'none',
  '@media (max-width: 600px)': {
    fontSize: '80px',
    left: 0,
    top: "70px",
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  fontSize: '2.5rem',
  fontWeight: 700,
  marginBottom: theme.spacing(6),
  position: 'relative',
  display: 'inline-block',
  color: theme.palette.gray[90],
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: '-8px',
    left: 0,
    width: '100%',
    height: '2px',
    backgroundColor: theme.palette.gray[90],
  },
  '@media (max-width: 600px)': {
    fontSize: '2rem',
  },
}));

const ContentText = styled(Typography)(({ theme }) => ({
  fontSize: '1.1rem',
  lineHeight: 1.7,
  color: theme.palette.grey[700],
  marginBottom: theme.spacing(3),
  maxWidth: '800px',
}));

const SocialLinks = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(4),
  marginTop: theme.spacing(6),
}));

const SocialIcon = styled(Link)(({ theme }) => ({
  color: theme.palette.grey[700],
  transition: 'color 0.2s ease-in-out',
  '&:hover': {
    color: theme.palette.primary.main,
  },
}));

const AboutSection = () => {
  return (
    <Box component="section" sx={{ backgroundColor: 'white' }}>
      <AboutContainer maxWidth="lg">
        <BackgroundText>ABOUT</BackgroundText>
        
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Title variant="h2">About Me</Title>
          
          <ContentText>
            Lorem ipsum dolor amet, consectetuer adipiscing elit. Curabitur parturient ornare iaculis libero ante venenatis. Cursus et scelerisque bibendum, habitasse inceptos taciti. In ultrices ridiculus class vestibulum quam leo velit conubia. Eleifend tempus primis vestibulum fames parturient.
          </ContentText>
          
          <ContentText>
            Lorem ipsum dolor amet, consectetuer adipiscing elit.
          </ContentText>
          
          <ContentText>
            Lorem ipsum dolor amet, consectetuer adipiscing elit. Aptent lacinia egestas ac conubia luctus facilisi congue pulvinar.
          </ContentText>
          
          <ContentText>
            Let&apos;s work together, send me a mail:{' '}
            <Link 
              href="mailto:emeruchecole@gmail.com"
              sx={{ 
                color: 'primary.main',
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' }
              }}
            >
              emeruchecole@gmail.com
            </Link>
          </ContentText>
          
          <SocialLinks>
            <SocialIcon href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <TwitterIcon />
            </SocialIcon>
            <SocialIcon href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <LinkedInIcon />
            </SocialIcon>
            <SocialIcon href="mailto:emeruchecole@gmail.com">
              <EmailIcon />
            </SocialIcon>
          </SocialLinks>
        </Box>
      </AboutContainer>
    </Box>
  );
};

export default AboutSection;