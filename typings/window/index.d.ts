import { History } from 'history';

declare global {
  interface Window {
    renderShoreline(containerId: string): void;

    unmountShoreline(containerId: string): void;

    isRenderedByContainer: boolean;
  }
}
