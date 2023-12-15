<script>
	import BlankStaff from '$lib/components/BlankStaff.svelte';
	import StaffChords from '$lib/components/StaffChords.svelte';
	import seventhChords from '$lib/seventhChords';
</script>

<main class="stack">
	<h1>LAFSMW Theory Test</h1>
	<div>
		<label class="levels" for="level-select"> Choose your Level IV class preference: </label>

		<select name="levels" id="level-select">
			<option value="">Please choose an option</option>
			<option value="advanced-theory">Advanced theory</option>
			<option value="advanced-improvisation"> Advanced improvisation </option>
			<option value="intro-to-arranging">Intro to arranging</option>
			<option value="intermediate-arranging"> Intermediate arranging </option>
			<option value="advanced-arranging">Advanced arranging</option>
			<option value="rhythm-class">Rhythm class</option>
			<option value="sibelius-class">Sibelius class</option>
		</select>
	</div>
	<div class="stack">
		<div>
			<BlankStaff
				numBars={4}
				addDoubleBarLine={true}
				instructions={'Write the following key signatures'}
			/>
		</div>
		<div>
			<h2>Identify the following 7th chords:</h2>
			<StaffChords addDoubleBarLine={true} numBars={7} chords={seventhChords} />
		</div>
		<div>
			<BlankStaff
				numBars={4}
				addDoubleBarLine={true}
				instructions={'Identify the following key signatures'}
			/>
		</div>
		<div>
			<BlankStaff numBars={2} instructions={'Write the following scales'} />
			<BlankStaff numBars={2} noTimeSignature={true} />
			<BlankStaff numBars={2} noTimeSignature={true} addDoubleBarLine={true} />
		</div>
	</div>
</main>

<style>
	.stack {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.levels {
		margin-left: 1rem;
		margin-top: 1rem;
		font-size: 1.25rem;
		text-align: center;
	}
</style>
