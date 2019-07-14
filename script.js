/*
if (navigator.requestMIDIAccess) {
	navigator.requestMIDIAccess({
		sysex: false
	}).then(onMIDISuccess, onMIDIFailure);
} else {
	alert("No MIDI support in your browser.");
}
*/

var keys = ["C", "Db", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"];
var majPent = [0, 2, 4, 7, 9];

function init() {
	try {
		const AudioContext = window.AudioContext || window.webkitAudioContext;
		const audioCtx = new AudioContext();
	} catch (e) {
		alert('Web Audio API not supported in this browser');
	}

	var oscillator = audioCtx.createOscillator();

	alert(context.createOscillator);

	oscillator.type = 'square';
	oscillator.frequency = 440;
	oscillator.connect(audioCtx.destination);
	oscillator.start();
}
window.addEventListener('load', init, false);

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


/*
function onMIDISuccess(midiAccess) {
    console.log('MIDI Access Object', midiAccess);
}

function onMIDIFailure(e) {
    console.log("No access to MIDI devices or your browser doesn't support WebMIDI API. Please use WebMIDIAPIShim " + e);
}
*/

var scale = getScaleNotes(majPent, pickKey());

document.getElementById("p1").innerHTML = scale.toString();
document.getElementById("p2").innerHTML = randNoteSeq(scale, 6).toString();