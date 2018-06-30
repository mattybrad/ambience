import Tone from 'tone';

class AppComponent {
  constructor(channelType) {
    this.channelType = channelType;
    this.scheduledEvents = [];
  }

  createEvents(time) {

    switch(this.channelType) {
      case 'chords':
      console.log('create chords ' + time);
      this.scheduledEvents.push(

      );
      break;
    }
  }
}

export default AppComponent;
