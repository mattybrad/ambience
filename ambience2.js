// globals
var channels = []; // will hold refs to config channel, chords, melody, and percussion

// channel class
function AmbientChannel(channelType, barsToCompose) {
  this.barsToCompose = barsToCompose; // number of bars to schedule at once
  this.nextComposition = 0; // time (in ticks) when more scheduling needs to happen
  this.doComposition = function() {
    switch(channelType) {
      case "config":
      
      break;
      
      case "chords":
      console.log("CHORDS");
      break;
      
      case "melody":
      console.log("MELODY");
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
