<script>
	import { onMount } from 'svelte';
	import Vex from 'vexflow';

	onMount(() => {
		const container = document.getElementById('music-notation');

		if (container) {
			const renderer = new Vex.Flow.Renderer(container, Vex.Flow.Renderer.Backends.SVG);
			const context = renderer.getContext();
			const stave = new Vex.Flow.Stave(10, 40, 400);

			// Add a clef and time signature
			stave.addClef('treble').addTimeSignature('4/4');

			// Add notes
			const notes = [
				new Vex.Flow.StaveNote({ keys: ['C4', 'E4', 'G4', 'B4'], duration: 'q' }),
				new Vex.Flow.StaveNote({ keys: ['F4', 'A4', 'C5', 'E5'], duration: 'q' }),
				new Vex.Flow.StaveNote({ keys: ['G4', 'B4', 'D5', 'F5'], duration: 'q' }),
				new Vex.Flow.StaveNote({ keys: ['A4', 'C5', 'E5', 'G5'], duration: 'q' })
			];

			// Create a voice and add the notes to it
			const voice = new Vex.Flow.Voice().addTickables(notes);

			// Format and draw
			const formatter = new Vex.Flow.Formatter().joinVoices([voice]).format([voice], 300);
			stave.setContext(context).draw();
			voice.draw(context, stave);
		}
	});
</script>

<div id="music-notation" />

<style>
	/* Add your styles here if needed */
</style>
