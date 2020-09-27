import React from 'react';
import ReactDOM from 'react-dom';

import App from 'components/app/App';

window.renderShoreline = (containerId: string) => {
  const elem = document.getElementById(containerId);

  if (elem) {
    ReactDOM.render(<App/>, elem);
  }
};

window.unmountShoreline = (containerId: string) => {
  const elem = document.getElementById(containerId);
  if (elem) {
    ReactDOM.unmountComponentAtNode(elem);
  }
};

if (!window.isRenderedByContainer) {

  window.renderShoreline('root');

}
