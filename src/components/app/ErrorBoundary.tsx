import React, { Component, PropsWithChildren } from 'react';

export class ErrorBoundary extends Component<PropsWithChildren<{}>> {
  state: { hasError: boolean } = { hasError: false };

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    return this.state.hasError ? (
      <p>The application is temporarily unavailable</p>
    ) : (
      this.props.children
    );
  }
}
