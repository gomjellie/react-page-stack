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

const PopPageAnimation = keyframes`
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(100%);
  }
`;

const RecallingPageAnimation = keyframes`
  0% {
    transform: translateX(-25%);
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

const Page = styled.div<{ status?: string }>`
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

  &.recalling {
    animation: ${RecallingPageAnimation} 0.5s;
    animation-fill-mode: forwards;
    pointer-events: none;
  }

  &.recalled {
  }

  &.left {
    transform: translateX(-25%);
  }

  &.leaving {
    animation: ${LeavingPageAnimation} 0.5s ease;
    animation-fill-mode: forwards;
    pointer-events: none;
  }

  &.popping {
    animation: ${PopPageAnimation} 0.5s ease;
    animation-fill-mode: forwards;
  }
`;

const MemoPage = memo(Page);

export { Page, MemoPage };
