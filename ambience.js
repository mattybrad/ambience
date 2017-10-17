var synth1 = new Tone.Synth().toMaster();
var synth2 = new Tone.Synth().toMaster();
var synths = [];
for(var i = 0; i < 8; i++) {
  synths[i] = new Tone.Synth().toMaster();
}
Tone.Transport.bpm.value = 120;

var chords = [
  ["C4","E4","G4"],
  ["A3","C4","E4"]
];
var chordNum = 0;
var loop = new Tone.Loop(function(time) {
  for(var i = 0; i < chords[chordNum].length; i++) {
    synths[i].triggerAttackRelease(chords[chordNum][i], "4n", time);
  }
  if(Math.random()>0.9) chordNum = (chordNum + 1)%2;
}, "2n");
loop.start("1m");
Tone.Transport.start();