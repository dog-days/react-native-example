import { Image } from 'react-native';
import StyleSheet from 'libs/style-sheet';

const listCommonLabel = {
  fontSize: 11,
};
export default StyleSheet.create({
  //search
  search: {
    width: 160,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    borderWidth: 0,
  },
  //begin----listrow styles
  listTitleContainer: { flex: 1, flexDirection: 'row' },
  cover: {
    width: 100,
    height: 56.25,
    resizeMode: Image.resizeMode.stretch,
  },
  listMiddleLabelContainer: {
    marginLeft: 10,
    width: 140,
  },
  labelName: {
    //摄像机名
    fontSize: 14,
    fontWeight: 'bold',
  },
  labelSN: Object.assign({}, listCommonLabel, {}),
  labelGroup: Object.assign({}, listCommonLabel, {}),
  statusContainer: {
    position: 'absolute',
    top: 0,
    right: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333',
    padding: 5,
    paddingTop: 2,
    paddingBottom: 2,
  },
  statusCircle: {
    width: 5,
    height: 5,
    borderRadius: 5,
    backgroundColor: 'red',
  },
  statusLabel: {
    fontSize: 12,
    marginLeft: 3,
    color: '#fff',
  },
  //end----listrow styles
  //begin----onStatisticsPress modal
  statisticsModalContent: {
    flexDirection: 'row',
  },
  leftLabel: { flex: 1, textAlign: 'right' },
  rightLabel: { flex: 1, textAlign: 'left' },
  //end----onStatisticsPress modal
});
