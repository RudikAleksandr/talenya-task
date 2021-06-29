import {
  Resource, ResourceServiceLoadByKeyWords, ResourceServiceLoadByUrl,
} from '../entities/resourcesEntities';

export default class ResourcesService {
  constructor(private resourceServiceList: (
    ResourceServiceLoadByKeyWords & ResourceServiceLoadByUrl
  )[]) { }

  loadResourcesByKeyWords(keyWords: string): Promise<Resource[]> {
    const promiseResourceList: Promise<Resource[]>[] = [];

    this.resourceServiceList.forEach((resourceService) => {
      if (resourceService.loadResourcesByKeyWords) {
        promiseResourceList.push(resourceService.loadResourcesByKeyWords(keyWords));
      }
    });

    return Promise.all(promiseResourceList).then((resourceList) => resourceList.flat());
  }

  getContentUrlByResourceUrl(resourceUrl: string): string {
    let resourceId: string | null | undefined;

    const resourceService = this.resourceServiceList.find((resourceServiceItem) => {
      resourceId = resourceServiceItem.getIdByParsingResourceUrl
        && resourceServiceItem.getIdByParsingResourceUrl(resourceUrl);
      return !!resourceId;
    });

    if (resourceService) {
      return resourceService.getResourceContentUrl(resourceId as string);
    }

    return '';
  }
}
