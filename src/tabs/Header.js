import React from 'react';
import cx from 'classnames';

function Header({ statusBarClasses, headerClasses, headerStyles, children }) {
  return (
    <div>
      <div className={cx('h1', statusBarClasses)} />
      <div
        className={cx('tc flex justify-center items-center pv3 ph3 pale-dark-green', headerClasses)}
        style={{ ...headerStyles, maxHeight: '40px' }}
      >
        {children}
      </div>
    </div>
  );
}

export default Header;
