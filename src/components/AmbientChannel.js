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

    if(this.channelType == 'chords') {
      this.testSynth = new Tone.PolySynth(6, Tone.Synth).toMaster();
      this.testSynth.set({
        envelope: {
          attack: 0.5,
          release: 3,
          sustain: 1
        },
        volume: -10
      });
    }
  }

  createEvents(time) {

    switch(this.channelType) {
      case 'chords':
      // temp, proof of concept...
      var thisSequence = this.knownChordSequences[Math.floor(Math.random()*this.knownChordSequences.length)];
      for(var i = 0; i < thisSequence.length; i ++) {
        var chord = new Tone.Event(function(time, chord){
          this.testSynth.triggerAttackRelease(chord, '2n');
        }.bind(this), this.chordNotes[thisSequence[i]]);
        chord.start('+'+i+'m');

        // need a way to store the scheduled chord progression
        // would be better to use Tone events as single source of truth, but no obvious documented way to do so(?)
        // this will do for now:
        this.logEvent('chord', Tone.TimeBase(time) + Tone.TimeBase(i+':0:0'), this.chordNotes[thisSequence[i]]);
      }
      break;

      case 'melody':
      var testChord = AppComponent.chordChannel.getChordAtTime(time);
      console.log(testChord);
      break;
    }
  }

  // log events that will need to be referenced by other channels
  logEvent(eventType, eventTime, eventData) {
    // add garbage collection here for expired events?

    this.scheduledEvents.push({
      type: eventType,
      time: eventTime,
      data: eventData
    })

    // events not guaranteed to be in order, so we should order them here...
  }

  getChordAtTime(time) {
    var foundChordIndex = -1;
    for(var i = this.scheduledEvents.length - 1; i >= 0; i --) {
      if(time <= this.scheduledEvents[i].time) foundChordIndex = i;
    }
    return foundChordIndex >= 0 ? this.scheduledEvents[foundChordIndex] : null;
  }

}

AppComponent.chordChannel = null;

export default AppComponent;
