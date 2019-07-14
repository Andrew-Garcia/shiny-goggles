console.clear();

// for cross browser
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

var AFreq = 440;
var A = 9; // A's placement in the keys array
var keys = ["C", "Db", "D", "Eb", "E", "F", "F#", "G", "Ab", "A", "Bb", "B"];
var majPent = [0, 2, 4, 7, 9];

function getFrequencyOfNote(num)
{
	var halfStepDist = num - A;
	return (AFreq * Math.pow(1.059463, halfStepDist)).toFixed(2);
}

function pickKey() {
	return Math.floor(Math.random() * keys.length);
}

function getScaleNotes(scale, key) {
	var scaleNotes = [];
	for (i = 0; i < scale.length; i++)
	{
		scaleNotes.push((key + scale[i]) % keys.length);
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
var sequence = randNoteSeq(scale, 6);

document.getElementById("p1").innerHTML = scale.toString();
document.getElementById("p2").innerHTML = sequence.toString();
document.getElementById("p3").innerHTML = getFrequencyOfNote(sequence[0]);

function playNoteSeq() {
	var oscillator = audioCtx.createOscillator();
	var gainNode = audioCtx.createGain();

	var curTime = audioCtx.currentTime;

	oscillator.type = 'square';
	oscillator.frequency.setValueAtTime(440, curTime);
	oscillator.frequency.setValueAtTime(311.13, curTime + 1);
	oscillator.frequency.setValueAtTime(440, curTime + 2);

	oscillator.connect(gainNode).connect(audioCtx.destination);

	oscillator.start();
	gainNode.gain.value = 0.01;
}

function mute()
{
	gainNode.gain.value = 0;
}