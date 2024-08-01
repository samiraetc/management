import React from 'react';
import Settings from '@/components/Layout/Settings';

const withSettings = <P extends object>(Component: React.ComponentType) => {
  const WrappedComponent = (props: P) => (
    <Settings>
      <Component {...props} />
    </Settings>
  );

  return WrappedComponent;
};

export default withSettings;
