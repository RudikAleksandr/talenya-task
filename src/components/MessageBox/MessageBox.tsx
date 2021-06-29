import { FC, ReactElement } from 'react';
import { Modal, Button } from 'react-bootstrap';

type Props = {
  title: string;
  message: string;
  onClose(): void;
};

const MessageBox: FC<Props> = ({ title, message, onClose }: Props): ReactElement => (
  <Modal
    show
    centered
    onHide={onClose}
  >
    <Modal.Header closeButton>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p>{message}</p>
    </Modal.Body>
    <Modal.Footer>
      <Button
        variant="secondary"
        onClick={onClose}
      >
        Close
      </Button>
    </Modal.Footer>
  </Modal>
);

export default MessageBox;
