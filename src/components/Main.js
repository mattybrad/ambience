require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

class AppComponent extends React.Component {
  render() {
    return (
      <div className="index">this will be an awesome ambient music generator one day</div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
