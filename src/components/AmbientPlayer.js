import React from 'react';
import Tone from 'tone';
import AmbientChannel from './AmbientChannel';

class AppComponent extends React.Component {
  componentDidMount() {

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
    var scheduleLoop = new Tone.Loop(this.doScheduling.bind(this), '4m'); // adjust 16n later to respresent 4 bars regardless of time signature
    scheduleLoop.start();
  }

  doScheduling(time) {
    for(var i = 0; i < this.channels.length; i ++) {
      this.channels[i].createEvents(time);
    }
  }

  render() {
    return null;
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
