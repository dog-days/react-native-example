import fetch from 'src/utils/fetch';

//不可修改，model要用到，不包含接口的前缀
export const apiAddress = 'cameras';
//请求取消函数
export let cancel;

export function requestApi(params) {
  if (params.groups && params.groups.length > 0) {
    params.groups = params.groups.join(',');
  } else {
    params.groups = null;
  }
  let url = apiAddress;
  const cancelSource = fetch.getCancelSource();
  cancel = cancelSource.cancel;
  return fetch
    .get(url, { params, cancelToken: cancelSource.token })
    .catch(error => {
      return false;
    });
}
