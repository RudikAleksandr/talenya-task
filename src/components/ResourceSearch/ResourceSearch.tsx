import { ReactElement, FC, useCallback } from 'react';
import { FormControl, Button, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from '../../redux/hooks';
import { isValidHttpUrl } from '../../utils/urlUtil';
import { loadResourcesByKeyWords, setContentUrlByResourceUrl } from '../../redux/resources/resourcesSlice';
import { selectLoadingResource } from '../../redux/resources/resourcesSelector';

const ResourceSearch: FC = (): ReactElement => {
  const { register, getValues, watch } = useForm({ defaultValues: { searchText: '' } });
  const isLoadingResource = useSelector(selectLoadingResource);
  const dispatch = useDispatch();

  const handleSearchResources = useCallback(() => {
    const searchText = getValues('searchText');
    if (isValidHttpUrl(searchText)) {
      dispatch(setContentUrlByResourceUrl(searchText));
    } else {
      dispatch(loadResourcesByKeyWords(searchText));
    }
  }, []);

  return (
    <Col className="d-flex">
      <FormControl
        {...register('searchText')}
        placeholder="Enter a keywords or resource url"
      />
      <Button
        disabled={!watch('searchText') || isLoadingResource}
        onClick={handleSearchResources}
      >
        Search
      </Button>
    </Col>
  );
};

export default ResourceSearch;
