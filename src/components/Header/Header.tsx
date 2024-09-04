import { FC, PropsWithChildren } from 'react';
import './Header.scss';

const Header: FC<PropsWithChildren> = ({children}) => {
  return (
    <div className="header">
      <span>{children}</span>
    </div>
  );
}

export default Header;
