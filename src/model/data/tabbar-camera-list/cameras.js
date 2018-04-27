//外部依赖包

//内部依赖包
import { requestApi, apiAddress, cancel } from 'src/service/cameras';
import { mergeReducer } from 'src/utils/util';

export const namespace = apiAddress;

export default function() {
  return {
    namespace,
    state: {
      page: 1,
      size: 10,
      onlineCount: 0,
      offlineCount: 0,
      onlineRate: 0,
    },
    reducers: {
      dataReducer: mergeReducer,
      loadMoreDataReducer(state, { payload }) {
        let sliceStateData = state.data;
        // const showDataMaxLength = 50;
        // const stateDataLength = state.data.length;
        // if (stateDataLength > showDataMaxLength) {
        //   sliceStateData = state.data.slice(
        //     stateDataLength - showDataMaxLength,
        //     stateDataLength
        //   );
        // }
        let data = sliceStateData.concat(payload.data);
        return {
          ...state,
          ...payload,
          data,
        };
      },
      clear(state, action) {
        //如果使用this.state，clear函数不能用箭筒函数方式
        cancel();
        return this.state;
      },
    },
    sagas: {
      *dataSaga(
        { payload = {}, successCallback, failureCallback },
        { put, call }
      ) {
        let apiData = yield call(requestApi, payload);
        if (!apiData || apiData.__error__) {
          //没数据，或者非200数据
          yield put({
            type: 'dataReducer',
            payload: {
              loading: false,
            },
          });
          failureCallback && failureCallback();
          return;
        }
        successCallback && successCallback(apiData);
        let onlineCount = 0;
        let { data: { cameras = [], total } } = apiData;
        cameras.forEach(v => {
          if (parseInt(v.status) === 1) {
            onlineCount++;
          }
        });
        let type = 'dataReducer';
        const { loadMoreData, ...other } = payload;
        if (loadMoreData) {
          type = 'loadMoreDataReducer';
        }
        yield put({
          type: type,
          payload: {
            data: dataAdapter(cameras),
            total,
            onlineCount,
            offlineCount: total - onlineCount,
            onlineRate: onlineCount / total,
            ...other,
            loading: false,
          },
        });
      },
    },
  };
}

function dataAdapter(data) {
  data.forEach((v, k) => {
    // v.key = v.cid + '';
    v.key = Math.random() + '';
  });
  return data;
}
