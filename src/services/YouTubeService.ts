import {
  Resource, ResourceServiceLoadByKeyWords, ResourceServiceLoadByUrl, YouTubeResource,
} from '../entities/resourcesEntities';
import { YOU_TUBE_CONTENT_URL } from '../config';
import youTubeAPI from '../api/youTubeAPI';

class YouTubeService implements ResourceServiceLoadByKeyWords, ResourceServiceLoadByUrl {
  async loadResourcesByKeyWords(keyWords: string): Promise<Resource[]> {
    const videoList = await (await youTubeAPI.getVideoListByKeyWords(keyWords)).data.items;

    return videoList.map((video) => this.externalizeResource(video));
  }

  getIdByParsingResourceUrl(resourceUrl: string): string | null {
    const result1 = resourceUrl.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);

    if (result1[2]) {
      return result1[2].split(/[^0-9a-z_-]/i)[0];
    }

    const result2 = resourceUrl.match(/^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|&v(?:i)?=))([^#&?]*).*/);

    if (result2 && result2[1]) {
      return result2[1];
    }

    return null;
  }

  getResourceContentUrl(resourceId: string): string {
    return `${YOU_TUBE_CONTENT_URL}/${resourceId}`;
  }

  private externalizeResource({ id, snippet }: YouTubeResource): Resource {
    return {
      id: id.videoId,
      title: snippet.title,
      description: snippet.description,
      imgUrl: snippet.thumbnails.medium.url,
      contentUrl: this.getResourceContentUrl(id.videoId),
    };
  }
}

export default YouTubeService;
