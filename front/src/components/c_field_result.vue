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

.field-result {
	margin: calc(var(--margin) *0.5) 0;
}

.field-result .result{
	border-radius: 1rem;
	position: absolute;
	left: 50%;
	text-align: center;
	bottom: -4px;
	width: 85%;
	height: 3px;
	transform: translateX(-50%);
	overflow: hidden;
	opacity: 0;
	transition: .33s cubic-bezier(0.35, 0.025, 0.3, 1.1);
}


.result .result-fail, .result .result-pass{
	position: absolute;
	width: 100%;
	height: 3px;
	transform: translateX(-110%);
	transition: .33s cubic-bezier(0.35, 0.025, 0.3, 1.1);
	z-index: 1;
}

/*.result .result-pass{
	background-color: var( --colour-positive );
}
.result .result-fail{
	background-color: var( --colour-negative );
}*/


.field-result.pass .input{
	border: 2px solid var( --colour-positive );
}
.field-result.fail .input{
	border: 2px solid var( --colour-negative );
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
	animation-name: anim-error;
	animation-duration: .6s;	
	animation-timing-function: ease-out;
	animation-iteration-count: 1;
	animation-delay: 0;
}

.field-result:nth-child(1){
	animation-delay: 0.1s;
}
.field-result:nth-child(2){
	animation-delay: 0.2s;
}
.field-result:nth-child(3){
	animation-delay: 0.3s;
}
.field-result:nth-child(4){
	animation-delay: 0.4s;
}
.field-result:nth-child(5){
	animation-delay: 0.5s;
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

