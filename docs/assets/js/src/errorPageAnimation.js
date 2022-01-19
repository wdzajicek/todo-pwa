/**
 * 
 * @const ANIMATION_DURATION_MS {integer} - an integer representing the number 
 *   of milliseconds that the animation lasts. The animation duration is defined
 *   in the SCSS module '1-base/_svg.scss' ('.svg__four--animation')
 * 
 */
const SVG_FOUR = document.getElementById('svgFour');
const ANIMATION_DURATION_MS = 1000;

function errorPageAnimation() {
  SVG_FOUR.classList.add('svg__four--animate');
  window.setTimeout(() => {
    SVG_FOUR.classList.remove('svg__four--animate');
    SVG_FOUR.classList.add('svg__four');
  },ANIMATION_DURATION_MS)
}

export default errorPageAnimation;