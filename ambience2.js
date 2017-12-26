// globals
var channels = []; // will hold refs to config channel, chords, melody, and percussion

// synths
var chordSynth = new Tone.PolySynth(4, Tone.Synth).toMaster();

// other stuff
var knownChordSequences = [
  ["C","Am","F","G"],
  ["Am","Em","F","Em"],
  ["C","Em","F","Dm"]
]
var chordNotes = {
  "C": ["C4","E4","G4"],
  "Dm": ["D4","F4","A4"],
  "Em": ["E4","G4","B4"],
  "F": ["F4","A4","C4"],
  "G": ["G4","B4","D4"],
  "Am": ["A4","C4","E4"]
}

// channel class
function AmbientChannel(channelType, barsToCompose) {
  this.barsToCompose = barsToCompose; // number of bars to schedule at once
  this.nextComposition = 0; // time (in ticks) when more scheduling needs to happen
  this.previousSequence = null;
  this.currentSequence = null;
  this.doComposition = function() {
    this.previousSequence = this.currentSequence;
    
    switch(channelType) {
      case "config":
      
      break;
      
      case "chords":
      console.log("COMPOSE CHORDS");
      // in future, take account of previous chords
      var thisChordSequence = _.sample(knownChordSequences);
      for(var i = 0; i < thisChordSequence.length; i++) {
        chordSynth.triggerAttackRelease(
          chordNotes[thisChordSequence[i]],
          "1n",
          "+"+i.toString()+"*1n"
        );
      }
      break;
      
      case "melody":
      console.log("COMPOSE MELODY");
      break;
      
      case "percussion":
      
      break;
    }
  }
}

// define channels
channels[0] = new AmbientChannel("config", 1);
channels[1] = new AmbientChannel("chords", 4);
channels[2] = new AmbientChannel("melody", 2);
channels[3] = new AmbientChannel("percussion", 1);

var schedulingLoop = new Tone.Loop(function(time) {
  var c;
  for(var i = 0; i < channels.length; i ++) {
    c = channels[i];
    if(Tone.Transport.ticks>=c.nextComposition) {
      c.nextComposition += c.barsToCompose * Tone.Transport.timeSignature * Tone.Transport.PPQ
      c.doComposition();
    }
  }
}, "4n");
schedulingLoop.start();
Tone.Transport.start();
