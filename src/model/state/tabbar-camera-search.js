import { replaceStateModelTemplate } from 'src/utils/util';

export const namespace = 'tabbar-camera-search';

export default replaceStateModelTemplate(namespace, {
  q: null,
  groups: [],
  status: null,
  order: null,
  model: null,
});
