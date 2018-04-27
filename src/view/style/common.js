import StyleSheet from 'libs/style-sheet';
import { viewCommonBgColor, statusBarBgColor } from 'view/style/const';

export default StyleSheet.create({
  mt10: {
    marginTop: 10,
  },
  view: {
    height: '100%',
    backgroundColor: viewCommonBgColor,
  },
  navigationBar: {
    backgroundColor: statusBarBgColor,
  },
  text: {
    color: '#000',
  },
  serachInput: {},
});
