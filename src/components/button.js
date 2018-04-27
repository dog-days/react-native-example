import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, Label } from 'teaset';

import { primaryButtonColor } from 'view/style/const';

const defaultButtonBgColor = '#e8e7e7';
const defaultButtonFontColor = '#666';

function getStyle(buttonType, cssType) {
  let color = '#fff';
  switch (buttonType) {
    case 'default':
      if (cssType === 'color') {
        color = defaultButtonFontColor;
      } else {
        color = defaultButtonBgColor;
      }
      break;
    case 'primary':
      color = primaryButtonColor;
      if (cssType === 'color') {
        color = '#fff';
      } else {
        color = primaryButtonColor;
      }
      break;
    default:
      if (cssType === 'color') {
        color = defaultButtonFontColor;
      } else {
        color = defaultButtonBgColor;
      }
  }
  return color;
}
const CustomButton = styled(Button)`
  background: ${({ type }) => {
    return getStyle(type, 'background');
  }};
  border-color: ${({ type }) => {
    return getStyle(type);
  }};
`;
const CustomLabel = styled(Label)`
  color: ${({ buttonType }) => {
    return getStyle(buttonType, 'color');
  }};
`;

export default class NButton extends React.Component {
  static propTypes = {
    //离底部距离触发loadMore设置，默认值50
    // onRefresh: PropTypes.func,
  };
  render() {
    const { children, prefix, suffix, fontSize, ...other } = this.props;
    return (
      <CustomButton {...other}>
        {prefix}
        <CustomLabel buttonType={other.type} style={{ fontSize: fontSize }}>
          {children}
        </CustomLabel>
        {suffix}
      </CustomButton>
    );
  }
}
