<script>
	import { onMount, afterUpdate } from 'svelte';
	import Vex from 'vexflow';

	export let clef = 'treble';
	export let timeSignature = '4/4';
	export let noTimeSignature = false;
	export let width = 1650;
	export let height = 200;
	export let addDoubleBarLine = false;
	export let numBars = 4;
	export let instructions = '';
	export let chords = [];

	let vf;

	// Gather needed width info.
	let fullWidth;
	let widthOfFirstBar;
	let widthOfRemainingBars;

	onMount(() => {
		updateWidthInfo();
		drawStaff();
	});

	function updateWidthInfo() {
		width = window.innerWidth;
		fullWidth = width * 0.97;
		widthOfFirstBar = width / numBars;
		widthOfRemainingBars = (fullWidth - 34 - widthOfFirstBar) / (numBars - 1);
	}

	function drawStaff() {
		vf = new Vex.Flow.Factory({
			renderer: { elementId: 'music-notation', width, height } // Use container directly without container.id
		});

		const { Renderer, Stave, StaveNote, Accidental, Formatter } = Vex.Flow;
		const rendererContext = vf.getContext();
		rendererContext.setFont('Arial', 10);

		for (let i = 0; i < numBars; i++) {
			const stave = new Stave(
				i === 0 ? 17 : widthOfFirstBar + (i - 1) * widthOfRemainingBars + 17,
				40,
				i === 0 ? widthOfFirstBar : widthOfRemainingBars
			);

			if (i === 0) {
				noTimeSignature ? stave.addClef(clef) : stave.addClef(clef).addTimeSignature(timeSignature);
			}

			if (i === numBars - 1 && addDoubleBarLine) {
				stave.setEndBarType(3);
			}

			stave.setContext(rendererContext).draw();

			// Create each chord as a StaveNote.
			let notesMeasure = [new StaveNote(chords[i])];

			// Determine if any accidentals are needed for the current chord.
			let noteGroupAccidentals = noteGroupAccidentalsCheck(chords[i].keys);

			// Add accidentals to notes of each chord as needed.
			noteGroupAccidentals.forEach((accidental) => {
				notesMeasure[0].addModifier(new Accidental(accidental[0]), accidental[1]);
			});

			// Format and draw the chord on the current stave.
			Formatter.FormatAndDraw(rendererContext, stave, notesMeasure);
		}
	}

	// helper function to check for accidentals for each note in the "keys" array of each chord ("keys" refers to the notes in the chord).
	function noteGroupAccidentalsCheck(keys) {
		let noteAccidentals = [];
		for (let i = 0; i < keys.length; i++) {
			let currentKey = keys[i];
			if (currentKey.includes('bb')) {
				noteAccidentals.push(['b', i]);
			}
			if (currentKey.includes('b') && currentKey[0] !== 'b') {
				noteAccidentals.push(['b', i]);
			}
			if (currentKey.includes('#')) {
				noteAccidentals.push(['#', i]);
			}
		}
		return noteAccidentals;
	}
</script>

<div class="stack">
	<p>{instructions}</p>
	<div id="music-notation" />
</div>

<style>
	div {
		width: 100%;
		height: 100%;
	}
	.stack {
		display: flex;
		flex-direction: column;
	}
	p {
		margin-left: 1.5rem;
	}
</style>
