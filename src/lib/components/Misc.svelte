<script>
	import { onMount } from 'svelte';
	import Vex from 'vexflow';

	let vf;

	onMount(() => {
		// Create a VexFlow Renderer
		vf = new Vex.Flow.Factory({
			renderer: { elementId: 'music-notation', width: 400, height: 200 }
		});

		const score = vf.EasyScore();
		const system = vf.System();

		// Create a staff with 4 bars
		system
			.addStave({
				voices: [score.voice(score.notes('C4/4, E4/4, G4/4, B4/4', { stem: 'up' }))]
			})
			.addClef('treble');

		system.addStave({
			voices: [score.voice(score.notes('F4/4, A4/4, C5/4, E5/4', { stem: 'up' }))]
		});

		system.addStave({
			voices: [score.voice(score.notes('G4/4, B4/4, D5/4, F5/4', { stem: 'up' }))]
		});

		system.addStave({
			voices: [score.voice(score.notes('A4/4, C5/4, E5/4, G5/4', { stem: 'up' }))]
		});

		vf.draw();
	});
</script>

<div id="music-notation"></div>

<style>
	#music-notation {
		width: 100%;
		height: 100%;
	}
</style>
