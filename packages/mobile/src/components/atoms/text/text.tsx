import type {PropsWithChildren} from 'react';
import React from 'react';

import type {StyledTextProps} from './text.styles';
import {StyledText} from './text.styles';

export type AppTextProps = PropsWithChildren<StyledTextProps>;

const AppText: React.FC<AppTextProps> = ({children, ...props}) => (
  <StyledText {...props}>{children}</StyledText>
);

export default AppText;
