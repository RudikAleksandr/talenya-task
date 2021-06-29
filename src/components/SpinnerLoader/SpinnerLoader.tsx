import { FC, ReactElement, ReactNode } from 'react';
import classNames from 'classnames';
import classes from './SpinnerLoader.module.scss';

type Props = {
  isLoading: boolean;
  children: ReactNode | ReactNode[];
  className?: string;
};

const SpinnerLoader: FC<Props> = (({ isLoading, children, className }: Props): ReactElement => (
  <>
    {isLoading ? (
      <div className={classNames(className, classes.root)}>
        <div className={classes.loader} />
      </div>
    ) : children}
  </>
));

SpinnerLoader.defaultProps = {
  className: '',
};

export default SpinnerLoader;
