import React from 'react';
import Modal from 'react-native-modal';
import { View } from 'react-native';
import StyleSheet from 'libs/style-sheet';
import { Button, Label } from 'teaset';
import PropTypes from 'prop-types';
import isString from 'lodash/isString';

import { primaryColor } from 'view/style/const';

const commonBorderColor = '#ddddddab';

//react-native-modal api请查看https://github.com/react-native-community/react-native-modal
export default class BasicModal extends React.Component {
  static propTypes = {
    footer: PropTypes.array,
    modalContainerStyle: PropTypes.object,
    contentStyle: PropTypes.object,
    //titleStyle只有title为string类型才起作用
    titleStyle: PropTypes.object,
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  };

  render() {
    const {
      title,
      footer,
      modalContainerStyle,
      titleStyle,
      contentStyle,
      children,
      ...other
    } = this.props;
    return (
      <Modal {...other}>
        <View style={styles.modalTopcontainer}>
          <View style={[styles.modalContainer, modalContainerStyle]}>
            {React.isValidElement(title) && title}
            {title &&
              isString(title) && (
                <Label style={[styles.title, titleStyle]}>{title}</Label>
              )}
            <View style={[styles.content, contentStyle]}>{children}</View>
            <View style={styles.footer}>
              {footer &&
                footer.map((v, k) => {
                  return (
                    <Button
                      key={k}
                      style={[
                        styles.footerButton,
                        {
                          borderLeftWidth: k !== 0 ? 1 : 0,
                        },
                      ]}
                      titleStyle={{
                        fontSize: 18,
                        color: primaryColor,
                      }}
                      type="default"
                      size="xl"
                      title={v.text}
                      onPress={v.onPress}
                    />
                  );
                })}
            </View>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modalTopcontainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  modalContainer: {
    width: '100%',
    borderRadius: 10,
    marginLeft: 0,
    marginRight: 0,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  title: {
    padding: 15,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  content: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: commonBorderColor,
  },
  footer: {
    flexDirection: 'row',
  },
  footerButton: {
    flex: 1,
    paddingTop: 13,
    paddingBottom: 13,
    borderRadius: 0,
    borderWidth: 0,
    borderColor: null,
    borderTopWidth: 1,
    borderTopColor: commonBorderColor,
    borderLeftColor: commonBorderColor,
  },
});
