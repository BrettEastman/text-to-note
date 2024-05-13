<script lang='ts'>
	import { onMount, afterUpdate } from 'svelte';
	import { Factory, Flow } from 'vexflow';

	type NoteType = InstanceType<typeof Flow.Note>;

	type Chord = {
		keys: string[];
		duration: string;
		staveNotes?: NoteType | null;
		userClickY?: number;
		sharpIndexArray?: number[];
		flatIndexArray?: number[] | [];
	};

	export let clef: string = 'treble';
	export let timeSignature: string = '4/4';
	export let noTimeSignature: boolean = false;
	export let evenbars: boolean = false;
	export let width: number = 1650;
	export let height: number = 200;
	export let addDoubleBarLine: boolean = false;
	export let numBars: number = 4;
	export let chords: Chord[] = [];

	let rendererVF;

	// Gather needed width info.
	let fullWidth: number;
	let widthOfFirstBar: number;
	let widthOfRemainingBars: number;

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

	// helper function to check for accidentals for each note in the "keys" array of each chord ("keys" refers to the notes in the chord).
	function noteGroupAccidentalsCheck(keys: string[]): [string, number][] {
		let noteAccidentals: [string, number][] = [];
		for (let i = 0; i < keys.length; i++) {
		let currentKey = keys[i];
		if (currentKey.includes("bb")) {
			noteAccidentals.push(["b", i]);
		}
		if (currentKey.includes("b") && currentKey[0] !== "b") {
			noteAccidentals.push(["b", i]);
		}
		if (currentKey.includes("#")) {
			noteAccidentals.push(["#", i]);
		}
		}
		return noteAccidentals;
	}

	function drawStaff() {
		const { Stave, Factory, StaveNote, Accidental, Formatter } = Flow;

		const spaceAboveStaff = {
			space_above_staff_ln: -0.5,
		};
		
		rendererVF = new Factory({
			renderer: { elementId: 'music-notation', width, height } // Use container directly without container.id
		});

		const rendererContext = rendererVF.getContext();
		rendererContext.setFont('Arial', 10);

		for (let i = 0; i < numBars; i++) {
			// Create the staves, determining the width of the first and other staves and providing a clef and time signature for the first stave as needed.
			const stave = new Stave(
			i === 0 ? 17 : widthOfFirstBar + (i - 1) * widthOfRemainingBars + 17,
			40,
			i === 0 ? widthOfFirstBar : widthOfRemainingBars,
			spaceAboveStaff
			);

			if (i === 0) {
			noTimeSignature
				? stave.addClef(clef)
				: stave.addClef(clef).addTimeSignature(timeSignature);
			}
			if (i === numBars - 1 && addDoubleBarLine) {
			stave.setEndBarType(3);
			}
			// Connect the stave to the rendering context and draw.
			stave.setContext(rendererContext).draw();

			if (chords.length > 0) {
			// Create each chord as a StaveNote.
			let notesMeasure = [new StaveNote(chords[i])];

			// Determine if any accidentals are needed for the current chord.
			let noteGroupAccidentals = noteGroupAccidentalsCheck(chords[i].keys);

			// Add accidentals to notes of each chord as needed.
			noteGroupAccidentals.forEach((accidental) => {
				notesMeasure[0].addModifier(
				new Accidental(accidental[0]),
				accidental[1]
				);
			});

			// Format and draw the chord on the current stave.
			Formatter.FormatAndDraw(rendererContext, stave, notesMeasure);
			}
      	}
	}
</script>

<div id="music-notation" />

<!-- <div bind:this={container} /> -->

<style>
	div {
		width: 100%;
		height: 100%;
	}
</style>
