"use client";
import { FC, memo, ReactNode, useEffect, useRef, useState } from "react";
import { Box, styled } from "@mui/material";
import {
  AnimationPlaybackControls,
  useAnimate,
  useInView,
} from "framer-motion";
import { th } from "framer-motion/client";

const TICKER_DIRECTION_LEFT = -1;

interface InfiniteCarouselProps {
  children: JSX.Element[];
  duration?: number;
  isPlaying?: boolean;
  direction?: number;
}

const CarouselContainer = styled(Box)({
  height: "100%",
  width: "100%",
  overflow: "hidden",
  backgroundColor: "gray.5",
});

const CarouselContent = styled(Box)(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "flex-start",
  backgroundColor: theme.palette.primary.main,
  gap: theme.spacing(4),
}));

const ImageWrapper = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "& img": {
    height: "auto",
    width: "100%",
  },
}));

const TickerAnimation: FC<InfiniteCarouselProps> = memo(
  (props: InfiniteCarouselProps) => {
    const {
      children,
      duration = 3000,
      isPlaying = true,
      direction = TICKER_DIRECTION_LEFT,
    } = props;

    const tickerRef = useRef<HTMLDivElement>(null);
    const [tickerUUID, setTickerUUID] = useState<string>("");
    const [tickerContentWidth, setTickerContentWidth] = useState<number | null>(
      0
    );
    const [numItemDupes, setNumItemDupes] = useState<number>(1);
    const [scope, animate] = useAnimate();
    const [animationControls, setAnimationControls] = useState<
      AnimationPlaybackControls | undefined
    >(undefined);
    const isInView = useInView(scope);

    useEffect(() => {
      const randomNum = Math.random();
      setTickerUUID(randomNum.toString().split(".").pop() ?? "");
    }, []);

    useEffect(() => {
      let contentWidth = 0;

      for (let index = 0; index < children.length; index++) {
        const element = document.getElementById(
          `${tickerUUID}_${index}`
        )?.clientWidth;
        if (element) {
          contentWidth += element;
        }
      }

      setTickerContentWidth(contentWidth);
    }, [children.length, tickerUUID]);

    useEffect(() => {
      if (tickerRef.current && tickerContentWidth) {
        setNumItemDupes(
          Math.max(
            Math.ceil((2 * tickerRef.current.clientWidth) / tickerContentWidth),
            1
          )
        );
      }
    }, [tickerContentWidth]);

    useEffect(() => {
      if (isInView && !animationControls) {
        const controls = animate(
          scope.current,
          { x: tickerContentWidth ? tickerContentWidth * direction : 0 },
          { ease: "linear", duration, repeat: Infinity }
        );
        controls.play();
        setAnimationControls(controls);
      }
    }, [
      animate,
      animationControls,
      direction,
      duration,
      isInView,
      scope,
      tickerContentWidth,
    ]);

    useEffect(() => {
      if (animationControls) {
        if (!isPlaying) {
          animationControls.pause();
        } else {
          animationControls.play();
        }
      }
    }, [animationControls, isInView, isPlaying]);

    const handleMouse = (newDuration: number): void => {
      const controls = animate(
        scope.current,
        { x: tickerContentWidth ? tickerContentWidth * direction : 0 },
        { ease: "linear", duration: newDuration, repeat: Infinity }
      );
      controls.play();
      setAnimationControls(controls);
      if (animationControls) {
        animationControls.play();
      }
    };

    const handleMouseEnter = (): void => {
      handleMouse(600);
    };

    const handleMouseLeave = (): void => {
      handleMouse(duration);
    };

    return (
      <CarouselContainer
        ref={tickerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <CarouselContent ref={scope}>
          {children.map((item, index) => (
            <Box key={index} id={`${tickerUUID}_${index}`}>
              {item}
            </Box>
          ))}
          {Array.from({ length: numItemDupes }).map(() =>
            children.map((item, index) => <Box key={index}>{item}</Box>)
          )}
        </CarouselContent>
      </CarouselContainer>
    );
  }
);

TickerAnimation.displayName = "TickerAnimation";

interface InfiniteCarouselImageProps {
  images: ReactNode[];
  duration?: number;
}

export const InfiniteCarousel: FC<InfiniteCarouselImageProps> = ({
  images,
  duration = 60,
}) => {
  const duplicatedImages = [...images, ...images];

  return (
    <TickerAnimation duration={duration}>
      {duplicatedImages.map((img, index) => (
        <ImageWrapper key={index}>{img}</ImageWrapper>
      ))}
    </TickerAnimation>
  );
};
