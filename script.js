console.clear();

// for cross browser
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

var oscillator = audioCtx.createOscillator();
var gainNode = audioCtx.createGain();

oscillator.type = 'square';
oscillator.frequency.setValueAtTime(440, audioCtx.currentTime);

oscillator.connect(gainNode).connect(audioCtx.destination);

oscillator.start();
gainNode.gain.value = 0;

var keys = ["C", "Db", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"];
var majPent = [0, 2, 4, 7, 9];

function pickKey() {
	return Math.floor(Math.random() * keys.length);
}

function getScaleNotes(scale, key) {
	var scaleNotes = [];
	for (i = 0; i < scale.length; i++)
	{
		scaleNotes.push(keys[(key + scale[i]) % keys.length]);
	}
	return scaleNotes;
}

function randNoteSeq(scale, num) {
	var noteSeq = [];
	for (var j = 0; j < num; j++)
	{
		noteSeq.push(scale[Math.floor(Math.random() * scale.length)]);
	}
	return noteSeq;
}

var scale = getScaleNotes(majPent, pickKey());

document.getElementById("p1").innerHTML = scale.toString();
document.getElementById("p2").innerHTML = randNoteSeq(scale, 6).toString();