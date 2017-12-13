// globals
var channels = []; // will hold refs to config channel, chords, melody, and percussion

// channel class
function AmbientChannel(channelType, barsToCompose) {
  this.barsToCompose = barsToCompose; // number of bars to schedule at once
  this.nextComposition = 0; // time (in ticks) when more scheduling needs to happen
  this.noteQueue = [];
  this.noteQueueStep = 0;
  this.doComposition = function() {
	this.noteQueue = []; // reset note queue
    switch(channelType) {
      case "config":
      
      break;
      
      case "chords":
      
      break;
      
      case "melody":
      this.noteQueue.push([0,"C4"]);
      this.noteQueue.push([1,"E4"]);
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
	  c.noteQueueStep = 0;
    }
	var n;
	for(var j = 0; j < c.noteQueue.length; j ++) {
		n = c.noteQueue[j];
		if(n[0] == c.noteQueueStep) console.log(n[1]);
	}
	c.noteQueueStep ++;
  }
}, "4n");
schedulingLoop.start();
Tone.Transport.start();
