export interface Resource {
  id: string;
  title: string;
  description: string;
  imgUrl: string;
  contentUrl: string;
}

export interface ResourcesState {
  resourceList: Resource[];
  contentUrl: string;
  isLoading: boolean;
}

export interface ResourceServiceLoadByUrl {
  getResourceContentUrl(resourceId: string): string;
  getIdByParsingResourceUrl(resourceUrl: string): string | null;
}

export interface ResourceServiceLoadByKeyWords {
  loadResourcesByKeyWords(keyWords: string): Promise<Resource[]>
}

export interface YouTubeResource {
  id: {
    videoId: string;
  },
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      medium: {
        url: string;
      }
    }
  }
}
