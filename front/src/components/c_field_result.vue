<template>

	<div class="result"></div>

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
	transform: scaleY(0) scaleX(0);
	transition: 1s;
}

.field-result.pass .result {
	transform: scaleY(1) scaleX(1);
	background-color: var( --colour-positive );
}
.field-result.fail .result {
	transform: scaleY(1) scaleX(1);
	background-color: var( --colour-negative );
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

