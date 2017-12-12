// globals
var channels = []; // will hold refs to config channel, chords, melody, and percussion

// channel class
function AmbientChannel(type) {
  
}

var schedulingLoop = new Tone.Loop(function(time) {
  console.log(Tone.Transport.position);
}, "4n");
schedulingLoop.start();
Tone.Transport.start();
