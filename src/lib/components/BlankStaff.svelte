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
		//if (!container) return; // Check if the container is defined

		vf = new Vex.Flow.Factory({
			renderer: { elementId: 'music-notation', width, height } // Use container directly without container.id
		});

		const { Stave } = Vex.Flow;
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
		}
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
