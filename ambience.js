var synth1 = new Tone.Synth().toMaster();
var synth2 = new Tone.Synth().toMaster();
Tone.Transport.bpm.value = 120;

var loop = new Tone.Loop(function(time) {
  if(Math.random()>0.8) synth1.triggerAttackRelease("C4", "8n", time);
  if(Math.random()>0.8) synth2.triggerAttackRelease("E4", "8n", time);
}, "16n");
loop.start("1m");
Tone.Transport.start();