import axios, { AxiosResponse } from 'axios';
import { YOU_TUBE_API_BASE_URL, YOU_TUBE_API_KEY } from '../config';
import { YouTubeResource } from '../entities/resourcesEntities';

interface VideoListResponse {
  items: YouTubeResource[]
}

const instance = axios.create({
  baseURL: YOU_TUBE_API_BASE_URL,
  params: {
    key: YOU_TUBE_API_KEY,
  },
});

const getVideoListByKeyWords = (keyWords: string): Promise<AxiosResponse<VideoListResponse>> => (
  instance.get('/search', {
    params: {
      q: keyWords,
      part: 'snippet',
      type: 'video',
      maxResults: 30,
    },
  })
);

export default {
  getVideoListByKeyWords,
};
