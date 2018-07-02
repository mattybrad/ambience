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
      'Am': ['A3','C4','E4']
    }
    this.melodyNotes = ['C4','D4','E4','F4','G4','A4','B4','C5'];

    if(this.channelType == 'chords') {
      this.testSynth = new Tone.PolySynth(6, Tone.Synth).toMaster();
      this.testSynth.set({
        envelope: {
          attack: 0.1,
          release: 3,
          sustain: 1
        },
        volume: -25,
        oscillator: {
          type: 'square'
        }
      });
    }

    if(this.channelType == 'melody') {
      this.melodySynth = new Tone.Synth({
        oscillator: {
          type: 'triangle'
        },
        envelope: {
          release: 1
        }
      }).toMaster();
    }
  }

  createEvents(time) {

    switch(this.channelType) {
      case 'chords':
      // temp, proof of concept...
      var newChords = [];
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
        newChords.push(this.chordNotes[thisSequence[i]].join(''));
      }
      console.log('new chords scheduled: ' + newChords.join(', '));
      break;

      case 'melody':
      var melody = [];
      var elapsed = 0;
      var thisLength, thisNote;
      while(elapsed < 16) {
        var testChord = AppComponent.chordChannel.getChordAtTime(Tone.Time('+0:0:'+(elapsed*4)).toSeconds());
        thisLength = Math.ceil(Math.random() * 4);
        thisNote = this.getMelodyNoteFromChord(testChord ? testChord.data : null);
        melody.push([
          thisNote,
          '0:0:'+(thisLength*3.5),
          '+0:0:'+(elapsed*4)
        ]);
        elapsed += thisLength;
      }
      var s = this.melodySynth, m = melody;
      for(var i = 0; i < m.length; i ++) {
        s.triggerAttackRelease(m[i][0], m[i][1], m[i][2]);
      }
      break;
    }
  }

  getMelodyNoteFromChord(chord) {
    if(Math.random() < 0.7 && chord != null) {
      var chordNote = chord[Math.floor(Math.random()*chord.length)];
      return chordNote;
    } else {
      var randomNote = this.melodyNotes[Math.floor(Math.random()*this.melodyNotes.length)];
      return randomNote;
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
      if(time < this.scheduledEvents[i].time) foundChordIndex = i;
    }
    return foundChordIndex >= 0 ? this.scheduledEvents[foundChordIndex-1] : this.scheduledEvents[this.scheduledEvents.length-1];
  }

}

AppComponent.chordChannel = null;

export default AppComponent;
