import Tone from 'tone';

class AppComponent {
  constructor(channelType) {
    this.channelType = channelType;
    this.scheduledEvents = [];

    this.knownChordSequences = [
      ['C','Am','F','G'],
      ['Am','Em','F','Em'],
      ['C','Em','F','Dm']
    ]
    this.chordNotes = {
      'C': ['C4','E4','G4'],
      'Dm': ['D4','F4','A4'],
      'Em': ['E4','G4','B4'],
      'F': ['F4','A4','C4'],
      'G': ['G4','B4','D4'],
      'Am': ['A4','C4','E4']
    }
  }

  createEvents(time) {

    switch(this.channelType) {
      case 'chords':
      // temp, proof of concept...
      var thisSequence = this.knownChordSequences[Math.floor(Math.random()*this.knownChordSequences.length)];
      for(var i = 0; i < thisSequence.length; i ++) {
        var chord = new Tone.Event(function(time, chord){
          //console.log(chord);
        }, this.chordNotes[thisSequence[i]]);
        chord.start('+'+i+'m');

        // need a way to store the scheduled chord progression
        // would be better to use Tone events as single source of truth, but no obvious documented way to do so(?)
        // this will do for now:
        this.logEvent('chord', null, thisSequence[i]);
      }
      break;
    }
  }

  // log events that will need to be referenced by other channels
  logEvent(eventType, eventTime, eventData) {
    this.scheduledEvents.push({
      type: eventType,
      time: eventTime,
      data: eventData
    })
  }

}

export default AppComponent;
