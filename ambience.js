

var synth1 = new Tone.Synth().toMaster();
var synth2 = new Tone.Synth().toMaster();
var synths = [];
for(var i = 0; i < 8; i++) {
  synths[i] = new Tone.Synth().toMaster();
}
Tone.Transport.bpm.value = 120;

var melodyNotes = ["C4","D4","E4","F4","G4","A4","B4","C5"];
function constructMelody(chord) {
  var melody = [];
  var elapsed = 1;
  var thisLength, thisNote;
  while(elapsed < 8) {
    thisLength = Math.ceil(Math.random() * 4);
    thisNote = Math.floor(Math.random() * melodyNotes.length);
    melody.push([
		melodyNotes[thisNote],
		"0:"+thisLength.toString(),
		"0:"+elapsed.toString()
	]);
    elapsed += thisLength;
  }
  return melody;
}

var m = constructMelody();
console.log(m);

var s = new Tone.FMSynth().toMaster();
for(var i = 0; i < m.length; i ++) {
  s.triggerAttackRelease(m[i][0], m[i][1], m[i][2]);
}

Tone.Transport.start();

/*
var chords = [
  ["C4","E4","G4"],
  ["A3","C4","E4"],
  ["C4","F4","A4"]
];
var chordNum = 0;
var loop = new Tone.Loop(function(time) {
  for(var i = 0; i < chords[chordNum].length; i++) {
    synths[i].triggerAttackRelease(chords[chordNum][i], "4n", time);
  }
  if(Math.random()>0.7) chordNum = (chordNum + 1)%3;
}, "2n");
loop.start("1m");
Tone.Transport.start();
*/