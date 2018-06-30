import Tone from 'tone';

class AppComponent {
  constructor(channelType) {
    this.channelType = channelType;
    this.scheduledEvents = [];
    console.log("init channel: " + this.channelType);
  }

  createEvents() {

    switch(this.channelType) {
      case "chords":
      console.log("create chords");
      this.scheduledEvents.push(

      );
      break;
    }
  }
}

export default AppComponent;
