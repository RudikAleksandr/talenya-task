import { Resource } from '../../entities/resourcesEntities';
import { RootState } from '../store';

const selectResourceList = (state: RootState): Resource[] => state.resources.resourceList;

const selectContentUrl = (state: RootState): string => state.resources.contentUrl;

const selectLoadingResource = (state: RootState): boolean => state.resources.isLoading;

export {
  selectResourceList,
  selectContentUrl,
  selectLoadingResource,
};
