import { FC, ReactElement } from 'react';
import { Container, Row } from 'react-bootstrap';
import ResourceSearch from '../ResourceSearch';
import ResourceList from '../ResourceList';
import ResourceContent from '../ResourceContent';

const App: FC = (): ReactElement => (
  <Container>
    <Row xs="2" className="flex-nowrap justify-content-center mt-4">
      <ResourceSearch />
    </Row>
    <Row>
      <ResourceContent />
    </Row>
    <Row className="mb-5">
      <ResourceList />
    </Row>
  </Container>
);

export default App;
