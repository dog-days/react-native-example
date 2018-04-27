import fetch from 'src/utils/fetch';

//不可修改，model要用到，不包含接口的前缀
export const apiAddress = 'camera/<cid>';
//请求取消函数
export let cancel;

export function requestApi(params) {
  let url = apiAddress.replace('<cid>', params.cid);
  const cancelSource = fetch.getCancelSource();
  cancel = cancelSource.cancel;
  return fetch
    .get(url, { params, cancelToken: cancelSource.token })
    .catch(error => {
      return false;
    });
}
