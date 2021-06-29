import { Component, ReactElement } from 'react';
import MessageBox from '../MessageBox';

type Props = {
  children: ReactElement;
};

type State = {
  hasError: boolean;
  message: string;
};

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      message: '',
    };
  }

  static getDerivedStateFromError({ message }: Error): State {
    return { hasError: true, message };
  }

  handleCloseMessageBox = () => {
    this.setState({ hasError: false, message: '' });
  };

  render() {
    return (
      <>
        {this.props.children}
        {this.state.hasError && (
          <MessageBox
            title="Error"
            message={this.state.message}
            onClose={this.handleCloseMessageBox}
          />
        )}
      </>
    );
  }
}

export default ErrorBoundary;
