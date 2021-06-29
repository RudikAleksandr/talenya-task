import { FC, ReactElement } from 'react';
import { useSelector } from '../../redux/hooks';
import { selectContentUrl } from '../../redux/resources/resourcesSelector';

const ResourceContent: FC = (): ReactElement => {
  const contentUrl = useSelector(selectContentUrl);

  return (
    <>
      {contentUrl && (
        <iframe
          className="mt-4"
          width="1280"
          height="720"
          src={contentUrl}
          title="Resource content"
          frameBorder="0"
        />
      )}
    </>
  );
};

export default ResourceContent;
