import { FC, ReactElement } from 'react';
import { Card } from 'react-bootstrap';
import classNames from 'classnames';
import classes from './ResourceCard.module.scss';

type Props = {
  title: string;
  imgUrl: string;
  description: string;
  onClick(): void;
};

const ResourceCard: FC<Props> = ({
  title, imgUrl, description, onClick,
}: Props): ReactElement => (
  <Card
    onClick={onClick}
    className={classNames('h-100', classes.card)}
  >
    <Card.Img
      variant="top"
      src={imgUrl}
    />
    <Card.Body>
      <Card.Title>{title}</Card.Title>
      <Card.Text>{description}</Card.Text>
    </Card.Body>
  </Card>
);

export default ResourceCard;
