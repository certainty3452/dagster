// eslint-disable-next-line no-restricted-imports
import {Spinner as BlueprintSpinner} from '@blueprintjs/core';
import * as React from 'react';
import styled from 'styled-components';

import {colorAccentGray} from '../theme/color';

type SpinnerPurpose = 'page' | 'section' | 'body-text' | 'caption-text';

interface Props {
  purpose: SpinnerPurpose;
  value?: number;
  fillColor?: string;
  stopped?: boolean;
  title?: string;
}

export const Spinner = ({
  purpose,
  value,
  fillColor = colorAccentGray(),
  stopped,
  title = 'Loading…',
}: Props) => {
  const size = () => {
    switch (purpose) {
      case 'page':
        return 80;
      case 'section':
        return 32;
      case 'caption-text':
        return 10;
      case 'body-text':
      default:
        return 12;
    }
  };

  const padding = () => {
    switch (purpose) {
      case 'caption-text':
        return 1;
      case 'body-text':
        return 2;
      default:
        return 0;
    }
  };

  return (
    <SpinnerWrapper $padding={padding()} title={title}>
      <SlowSpinner size={size()} value={value} $fillColor={fillColor} $stopped={stopped} />
    </SpinnerWrapper>
  );
};

export const SpinnerWrapper = styled.div<{$padding: number}>`
  padding: ${({$padding}) => $padding}px;
`;

const SlowSpinner = styled(BlueprintSpinner)<{$fillColor: string; $stopped?: boolean}>`
  .bp4-spinner-animation {
    animation-duration: 0.8s;
    ${(p) => (p.$stopped ? 'animation: none;' : '')}

    path.bp4-spinner-track {
      stroke: ${(p) => p.$fillColor};
      stroke-opacity: 0.25;
    }
    path.bp4-spinner-head {
      ${(p) =>
        p.$stopped
          ? `stroke-opacity: 0;
             fill: ${p.$fillColor};
             fill-opacity: 1;
             transform: scale(44%);`
          : `stroke: ${p.$fillColor};
             stroke-opacity: 1;`}
    }
  }
`;
