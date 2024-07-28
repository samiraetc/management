import React from 'react';
import Layout from '@/components/Layout/Layout';

const withLayout = <P extends object>(Component: React.ComponentType) => {
  const WrappedComponent = (props: P) => (
    <Layout>
      <Component {...props} />
    </Layout>
  );

  return WrappedComponent;
};

export default withLayout;
