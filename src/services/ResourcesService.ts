import {
  Resource, ResourceServiceLoadByKeyWords, ResourceServiceLoadByUrl,
} from '../entities/resourcesEntities';

export default class ResourcesService {
  constructor(private resourceServiceList: (
    ResourceServiceLoadByKeyWords | ResourceServiceLoadByUrl |
    (ResourceServiceLoadByKeyWords & ResourceServiceLoadByUrl)
  )[]) { }

  loadResourcesByKeyWords(keyWords: string): Promise<Resource[]> {
    const promiseResourceList: Promise<Resource[]>[] = [];

    this.resourceServiceList.forEach((resourceService) => {
      if ('loadResourcesByKeyWords' in resourceService) {
        promiseResourceList.push(resourceService.loadResourcesByKeyWords(keyWords));
      }
    });

    return Promise.all(promiseResourceList).then((resourceList) => resourceList.flat());
  }

  getContentUrlByResourceUrl(resourceUrl: string): string {
    let resourceId: string | null | undefined;

    const resourceService = this.resourceServiceList.find((resourceServiceItem) => {
      resourceId = 'getIdByParsingResourceUrl' in resourceServiceItem
        ? resourceServiceItem.getIdByParsingResourceUrl(resourceUrl) : null;
      return !!resourceId;
    });

    if (resourceService && 'getResourceContentUrl' in resourceService) {
      return resourceService.getResourceContentUrl(resourceId as string);
    }

    return '';
  }
}
