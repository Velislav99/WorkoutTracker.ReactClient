import { keyframes } from '@emotion/react';

export const fadeIn = keyframes`
from {
  opacity: 0;
  transform: translateY(-10px);
}
to {
  opacity: 1;
  transform: translateY(0);
}
`;