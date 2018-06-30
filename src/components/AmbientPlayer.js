import React from 'react';
import Tone from 'tone';
import AmbientChannel from './AmbientChannel';

class AppComponent extends React.Component {
  componentDidMount() {
    this.scheduledTo = 0;
    this.scheduleWindow = 6000;

    this.channels = [
      new AmbientChannel('meta'),
      new AmbientChannel('drums'),
      new AmbientChannel('chords'),
      new AmbientChannel('bass'),
      new AmbientChannel('melody'),
      new AmbientChannel('harmony'),
      new AmbientChannel('sfx')
    ]

    Tone.Transport.start();
    setInterval(this.doScheduling.bind(this), 5000);
    this.doScheduling();
  }

  doScheduling() {
    if(this.scheduledTo < Date.now() + this.scheduleWindow) {
      for(var i = 0; i < this.channels.length; i ++) {
        this.channels[i].createEvents();
      }
      this.scheduledTo = Date.now() + this.scheduleWindow;
    }
  }

  render() {
    return null;
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
