import { FC, ReactElement, useCallback } from 'react';
import { Col } from 'react-bootstrap';
import { Resource } from '../../entities/resourcesEntities';
import { useDispatch, useSelector } from '../../redux/hooks';
import { selectLoadingResource, selectResourceList } from '../../redux/resources/resourcesSelector';
import { setContentUrl } from '../../redux/resources/resourcesSlice';
import ResourceCard from '../ResourceCard';
import SpinnerLoader from '../SpinnerLoader';

const ResourceList: FC = (): ReactElement => {
  const dispatch = useDispatch();
  const resourceList = useSelector(selectResourceList);
  const isLoadingResource = useSelector(selectLoadingResource);

  const handleClickCard = useCallback((contentUrl: string) => () => {
    window.scrollTo(0, 0);
    dispatch(setContentUrl(contentUrl));
  }, []);

  return (
    <SpinnerLoader
      className="mt-5"
      isLoading={isLoadingResource}
    >
      {resourceList.map((resource: Resource) => (
        <Col
          xs="4"
          className="mt-5"
          key={resource.id}
        >
          <ResourceCard
            title={resource.title}
            imgUrl={resource.imgUrl}
            description={resource.description}
            onClick={handleClickCard(resource.contentUrl)}
          />
        </Col>
      ))}
    </SpinnerLoader>
  );
};

export default ResourceList;
