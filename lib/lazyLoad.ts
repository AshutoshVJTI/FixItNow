import React, { Suspense } from 'react';
import LoadingIndicator from '../components/LoadingIndicator';

export function lazyLoad<T extends React.ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  fallback: React.ReactNode = React.createElement(LoadingIndicator)
) {
  const LazyComponent = React.lazy(importFunc);
  
  return function WithLazyLoading(props: React.ComponentProps<T>) {
    return React.createElement(
      Suspense,
      { fallback },
      React.createElement(LazyComponent, props)
    );
  };
} 