console.clear();

// for cross browser
const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioCtx = new AudioContext();

var AFreq = 440;
var A = 4; // A's placement in the keys array
var keys = ["F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#", "E"];
var staffPlace = [1.0, 1.0, 1.5, 1.5, 2.0, 2.0, 2.5, 3.0, 3.0, 3.5, 3.5, 4.0]
var majPent = [2, 4, 7, 9, 11];
//var minPent = [0, 3, 5, 7, 10]

var qNoteLength = 0.4;

var numberOfNotes = 6;
var gainVol = 0.05;

var mute = document.querySelector(".mute");
var play = document.querySelector(".play");
var newSequence = document.querySelector(".new");

var EPixLoc = 425;
var stepPixDist = 75;

var currScale = getScaleNotes(majPent, pickKey());
var currSeq = randNoteSeq(currScale, numberOfNotes);
drawNoteSequence(currSeq);

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
	for (j = 0; j < num; j++)
	{
		noteSeq.push({note: scale[Math.floor(Math.random() * scale.length)], length: qNoteLength});
		//noteSeq.push({note: 'r', length: 0.25});
	}

	return noteSeq;
}

function getTotalLength(notes) {
	var total = 0;
	for (k = 0; k < notes.length; k++)
	{
		total += notes[k].length;
	}
	return total;
}

function changeNoteLength(place, type)
{
	if (type == 0)
	{
		currSeq[place].length = qNoteLength / 2;
		document.getElementById(place.toString()).outerHTML = "";

		var x = 125 + place * 120;
		var y = EPixLoc - (stepPixDist * staffPlace[currSeq[place].note]);
			
		drawEighthNote(x, y, place);
	}
	else if (type == 1)
	{
		currSeq[place].length = qNoteLength;
		document.getElementById(place.toString()).outerHTML = "";

		var x = 125 + place * 120;
		var y = EPixLoc - (stepPixDist * staffPlace[currSeq[place].note]);
			
		drawQuarterNote(x, y, place);
	}
	else if (type == 2)
	{
		currSeq[place].length = qNoteLength * 2;
		document.getElementById(place.toString()).outerHTML = "";

		var x = 125 + place * 120;
		var y = EPixLoc - (stepPixDist * staffPlace[currSeq[place].note]);
			
		drawHalfNote(x, y, place);
	}
}

function addRest(sequence, place, len)
{
	sequence.splice(place, 0, {note: 'r', length: len});
}

function selectNote(event) {
	alert("hi");
}

function drawEighthNote(x, y, i)
{
	var svg = document.getElementsByTagName('svg')[0];
	var newElement = document.createElementNS("http://www.w3.org/2000/svg", 'path'); 
	var str = 
		"M "+ x + " " + y + 
		" A 25 20 0 1 0 " + (x + 10) + " " + (y + 20) +
		" V " + (y - 50) + 
		" Q " + (x + 30) + " " + (y - 45) + " " + (x + 25) + " " + (y - 10) +
		" Q " + (x + 50) + " " + (y - 40) + " " + (x + 10) + " " + (y - 85) +
		" H " + x +
		" Z";
	newElement.setAttribute("d", str); 
	newElement.setAttribute("class", "note");
	newElement.setAttribute("class", "note");
	newElement.setAttribute("id", i);
	newElement.setAttribute("onClick", "changeNoteLength(" + i + ", 1)")
	newElement.onclick = function() {changeNoteLength(i, 1);};
	svg.appendChild(newElement);
}

function drawQuarterNote(x, y, i)
{
	var svg = document.getElementsByTagName('svg')[0];
	var newElement = document.createElementNS("http://www.w3.org/2000/svg", 'path'); 
	var str = 
		"M "+ x + " " + y + 
		" A 25 20 0 1 0 " + (x + 10) + " " + (y + 20) +
		" V " + (y - 85) + 
		" H " + x +
		" Z";
	newElement.setAttribute("d", str); 
	newElement.setAttribute("class", "note");
	newElement.setAttribute("id", i);
	newElement.setAttribute("onClick", "changeNoteLength(" + i + ", 2)")
	newElement.onclick = function() {changeNoteLength(i, 2);};
	svg.appendChild(newElement);
}

function drawHalfNote(x, y, i)
{
	var svg = document.getElementsByTagName('svg')[0];
	var newElement = document.createElementNS("http://www.w3.org/2000/svg", 'path'); 
	var str = 
		"M "+ x + " " + y + 
		" A 25 20 0 1 0 " + (x + 10) + " " + (y + 20) +
		" V " + (y - 85) + 
		" H " + x +
		" M " + x + " " + (y + 16) + 
		" A 15 11 0 1 1 " + x + " " + (y + 15) + 
		" Z";
	newElement.setAttribute("d", str); 
	newElement.setAttribute("class", "note");
	newElement.setAttribute("id", i);
	newElement.setAttribute("class", "note");
	newElement.setAttribute("id", i);
	newElement.setAttribute("onClick", "changeNoteLength(" + i + ", 0)")
	newElement.onclick = function() {changeNoteLength(i, 0);};
	svg.appendChild(newElement);
}

function drawSharp(x, y)
{
	var svg = document.getElementsByTagName('svg')[0];
	var newElement = document.createElementNS("http://www.w3.org/2000/svg", 'path'); 
	var str = 
		"M "+ x + " " + y +
		" L " + (x + 3) + " " + (y + 9) +
		" H " + (x + 12) + 
		" L " + (x + 15) + " " + (y + 18) +
		" H " + (x + 6) +
		" L " + (x + 9) + " " + (y + 27) +
		" H " + (x + 18) +
		" L " + (x + 21) + " " + (y + 36) +
		" H " + (x + 30) +
		" L " + (x + 27) + " " + (y + 27) +
		" H " + (x + 36) +
		" L " + (x + 39) + " " + (y + 36) +
		" H " + (x + 48) + 
		" L " + (x + 45) + " " + (y + 27) +
		" H " + (x + 54) + 
		" L " + (x + 51) + " " + (y + 18) +
		" H " + (x + 42) +
		" L " + (x + 39) + " " + (y + 9) +
		" H " + (x + 48) + 
		" L " + (x + 45) + " " + y +
		" H " + (x + 36) +
		" L " + (x + 33) + " " + (y - 9) +
		" H " + (x + 24) +
		" L " + (x + 27) + " " + y +
		" H " + (x + 18) +
		" L " + (x + 15) + " " + (y - 9) +
		" H " + (x + 6) +
		" L " + (x + 9) + " " + y +
		" M " + (x + 21) + " " + (y + 9) +
		" H " + (x + 30) + 
		" L " + (x + 33) + " " + (y + 18) +
		" H " + (x + 24) +
		" L " + (x + 21) + " " + (y + 9) +
		" Z";
	newElement.setAttribute("d", str); 
	newElement.setAttribute("class", "note");
	svg.appendChild(newElement);
}

function drawNoteSequence(seq)
{
	var nextNote = 0;
	for (i = 0; i < seq.length; i++)
	{
		if (seq[i].note != 'r')
		{
			var x = 125 + nextNote * 120;
			var y = EPixLoc - (stepPixDist * staffPlace[seq[i].note]);
			
			if (keys[seq[i].note].includes("#")) {
				drawSharp(x - 100, y);
			}
			
			drawQuarterNote(x, y, nextNote.toString());
			nextNote++; 
		}
	}
}

function deleteNoteSequence()
{
	var elems = document.getElementsByClassName("note");
	while(elems.length > 0)
	{
		elems[0].parentNode.removeChild(elems[0]);
	}
}

newSequence.onclick = function newSeq() {
	currScale = getScaleNotes(majPent, pickKey());
	currSeq = randNoteSeq(currScale, numberOfNotes);
	deleteNoteSequence();
	drawNoteSequence(currSeq);
}

var oscil;
var gainNode = audioCtx.createGain();
var biquadFilter = audioCtx.createBiquadFilter();

play.onclick = function playNoteSeq() {
	if (oscil != null)
	{
		oscil.stop();
	}

	var curTime = audioCtx.currentTime;

	var oscillator = audioCtx.createOscillator();
	oscil = oscillator;

	biquadFilter.type = "lowpass";

	gainNode.gain.setValueAtTime(gainVol, audioCtx.currentTime);
	oscillator.type = 'sawtooth';

	for (i = 0; i < currSeq.length; i++)
	{
		if (currSeq[i].note == 'r')
		{
			gainNode.gain.setValueAtTime(0, curTime);
		} 
		else 
		{
			biquadFilter.frequency.setValueAtTime(200, curTime)
			biquadFilter.frequency.linearRampToValueAtTime(2000, curTime + 0.1);
			gainNode.gain.setValueAtTime(gainVol, curTime);
			oscillator.frequency.setValueAtTime(getFrequencyOfNote(currSeq[i].note), curTime);
		}
		curTime += currSeq[i].length;
	}

	oscillator.connect(biquadFilter);
	biquadFilter.connect(gainNode);
	gainNode.connect(audioCtx.destination);

	oscillator.start();
	oscillator.stop(audioCtx.currentTime + getTotalLength(currSeq));
}

mute.onclick = function stopPlay() {
	oscil.stop();
	oscil.cancelScheduledValues(audioCtx.currentTime);
	biquadFilter.cancelScheduledValues(audioCtx.currentTime);
}