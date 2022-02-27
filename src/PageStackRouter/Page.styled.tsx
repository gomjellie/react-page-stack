import styled, { keyframes } from 'styled-components';
import { memo } from 'react';

const EnteringPageAnimation = keyframes`
  0% {
    transform: translateX(100%);
  }

  100% {
    transform: translateX(0);
  }
`;

const PopPageAnimation = (pageX?: number) => keyframes`
  0% {
    transform: translateX(${pageX ?? 0});
  }

  100% {
    transform: translateX(100%);
  }
`;

const RecallingPageAnimation = (
  pageX?: number,
  pageWidth?: number,
  startX?: number
) => keyframes`
  0% {
    transform: translateX(${
      pageX === undefined || pageWidth === undefined || startX === undefined
        ? -25
        : (25 * Math.max(pageX - startX, 0)) / pageWidth - 25
    }%);
  }

  100% {
    transform: translateX(0);
  }
`;

const LeavingPageAnimation = keyframes`
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-25%);
  }
`;

const Page = styled.div<{
  pageX?: number;
  pageWidth?: number;
  startX?: number;
}>`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  max-width: 480px;
  height: 100%;
  overflow-y: auto;
  margin-bottom: auto;
  transition: transform 1s ease;
  background-color: black;

  &.entering {
    animation: ${EnteringPageAnimation} 0.5s;
    animation-fill-mode: forwards;
  }

  &.entered {
    transition: none;
  }

  &.recalling {
    animation: ${({ pageX, pageWidth, startX }) => {
        // console.log(
        //   `pageX: ${pageX}, pageWidth: ${pageWidth}, startX: ${startX}`
        // );
        if (
          pageX !== undefined &&
          pageWidth !== undefined &&
          startX !== undefined
        ) {
          // console.log((25 * Math.max(pageX - startX, 0)) / pageWidth - 25);
        }
        return RecallingPageAnimation(pageX, pageWidth, startX);
      }}
      0.5s;
    animation-fill-mode: forwards;
    pointer-events: none;
  }

  &.recalled {
  }

  &.left {
    transform: translateX(-25%);
    transition: none;
  }

  &.leaving {
    animation: ${LeavingPageAnimation} 0.5s ease;
    animation-fill-mode: forwards;
    pointer-events: none;
  }

  &.popping {
    animation: ${({ pageX }) => PopPageAnimation(pageX)} 0.5s ease;
    animation-fill-mode: forwards;
  }
`;

const MemoPage = memo(Page);

export { Page, MemoPage };
