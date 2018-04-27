import { replaceStateModelTemplate } from 'src/utils/util';

export const namespace = 'tabbar-camera-list';

export default replaceStateModelTemplate(namespace, {
  searchEdited: false,
  refreshing: false,
});
