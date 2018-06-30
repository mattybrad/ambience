require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';
import AmbientPlayer from './AmbientPlayer';

class AppComponent extends React.Component {
  componentDidMount() {

  }

  render() {
    return (
      <div className="index">
        <div className="infoDisplay">info goes here</div>
        <AmbientPlayer />
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
