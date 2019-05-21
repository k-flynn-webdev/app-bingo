<template>

	<div class="result">
		<div class="result-pass"></div>
		<div class="result-fail"></div>
	</div>

</template>

<script>

export default {
	name: 'cFieldResult',	
}

</script>

<style>

.field-result .result{
	position: absolute;
	left: 0;
	bottom: -6px;
	width: 100%;
	height: 5px;
	overflow: hidden;
	opacity: 0;
	transition: .33s cubic-bezier(0.35, 0.025, 0.3, 1.1);
}


.result .result-fail, .result .result-pass{
	position: absolute;
	width: 100%;
	height: 5px;
	transform: translateX(-110%);
	transition: .33s cubic-bezier(0.35, 0.025, 0.3, 1.1);
	z-index: 1;
}

.result .result-pass{
	background-color: var( --colour-positive );
}
.result .result-fail{
	background-color: var( --colour-negative );
}

.field-result.pass .result{
	opacity: 1;
}
.field-result.fail .result{
	opacity: 1;
}

.field-result.pass .result-pass {
	transform: translateX(0);
}
.field-result.fail .result-fail {
	transform: translateX(0);
}
.field-result.fail {
	animation: anim-error 1 .6s ease-out;
}

@keyframes anim-error {
	0% { transform: translateX(0); }
	7% { transform: translateX(-.5rem) skewX(5deg); }
	20% { transform: translateX(.4rem) skewX(-4deg); }
	40% { transform: translateX(-.3rem) skewX(3deg); }
	60% { transform: translateX(.2rem) skewX(-2deg); }
	80% { transform: translateX(-.1rem) skewX(1deg); }
	100% { transform: translateX(0); }
}

</style>

