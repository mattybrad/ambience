// globals
var channels = []; // will hold refs to config channel, chords, melody, and percussion

// channel class
function AmbientChannel(channelType, barsToCompose) {
  this.barsToCompose = barsToCompose; // number of bars to schedule at once
  this.nextComposition = 0; // time (in ticks) when more scheduling needs to happen
  this.noteQueue = [];
  this.noteQueueStep = 0;
  
  // initialise synth voices
  var synth;
  switch(channelType) {
	case "config":
	
	break;

	case "chords":
	synth = new Tone.PolySynth(5, Tone.Synth).toMaster();
	break;

	case "melody":
	synth = new Tone.Synth().toMaster();
	break;

	case "percussion":

	break;
  }
  
  this.doComposition = function() {
	this.noteQueue = []; // reset note queue
    switch(channelType) {
      case "config":
      
      break;
      
      case "chords":
      this.noteQueue.push([0,["C4","E4","G4"]]);
      this.noteQueue.push([8,["A4","C4","E4"]]);
      break;
      
      case "melody":
      this.noteQueue.push([0,"C5"]);
      this.noteQueue.push([1,"E5"]);
	  this.noteQueue.push([3,"F5"]);
	  this.noteQueue.push([5,"D5"]);
      break;
      
      case "percussion":
      
      break;
    }
  }
  
  this.playNote = function(note) {
    switch(channelType) {
      case "config":
      
      break;
      
      case "chords":
      synth.triggerAttackRelease(note[1],'1n');
      break;
      
      case "melody":
      synth.triggerAttackRelease(note[1],'4n');
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
		if(n[0] == c.noteQueueStep) c.playNote(n);
	}
	c.noteQueueStep ++;
  }
}, "4n");
schedulingLoop.start();
Tone.Transport.start();
