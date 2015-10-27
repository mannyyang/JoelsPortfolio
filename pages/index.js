import React, { Component } from 'react';

export default class extends Component {

  componentDidMount(){

    // aligned
    (function() {

      var canvas,
        context,
        particles = [],
        text = [],
        nextText = [],
        mouse = { x: -99999, y: -99999 },
        layout = 0,
        FPS = 60,

      /*
       * List words.
       */

        word = 'STINK DIGITAL' ;

      /*
       * Init.
       */

      function init() {

        var particlesContainer = document.querySelector('.particles-text');

        canvas = document.createElement('canvas');
        canvas.width = innerWidth;
        canvas.height = innerHeight;

        particlesContainer.appendChild(canvas);

        // Browser supports canvas?
        if(!!(capable)) {

          context = canvas.getContext('2d');

          // Events
          if('ontouchmove' in window) {
            canvas.addEventListener('touchup', onTouchUp, false);
            canvas.addEventListener('touchmove', onTouchMove, false);
          }
          else {
            canvas.addEventListener('mousemove', onMouseMove, false);
          }


          window.onresize = onResize;

          createParticles();

        }
        else {
          console.error('Sorry, switch to a better browser to see this experiment.');
        }

      }

      /*
       * Checks if browser supports canvas element.
       */

      function capable() {
        return canvas.getContext && canvas.getContext('2d');
      }

      /*
       * On resize window event.
       */

      function onResize() {

        canvas.width = window.innerWidth;
        canvas.height = 300;

        // Reset the text particles, and align again on the center of screen
        nextText = [];
        updateText();

      }

      function scrollX() {
        return window.pageXOffset || window.document.documentElement.scrollLeft;
      }

      function scrollY() {
        return window.pageYOffset || window.document.documentElement.scrollTop;
      }

      /*
       * Mouse move event.
       */

      function onMouseMove(event) {
        event.preventDefault();
        mouse.x = event.pageX - ( scrollX() + canvas.getBoundingClientRect().left );
        mouse.y = event.pageY - ( scrollY() + canvas.getBoundingClientRect().top );
      }

      /*
       * Touch up event.
       */

      function onTouchUp(event) {
        event.preventDefault();
        // Reset mouse position
        mouse = {
          x: -99999,
          y: -99999
        };
      }

      /*
       * Touch move event.
       */

      function onTouchMove(event) {
        event.preventDefault();
        mouse.x = event.touches[0].pageX - ( scrollX() + canvas.getBoundingClientRect().left );
        mouse.y = event.touches[0].pageY - ( scrollY() + canvas.getBoundingClientRect().top );
      }


      /*
       * Create particles.
       */

      function createParticles() {

        // Go!
        updateText();
        loop();

      }

      /*
       * Create text particles.
       * @param seed.
       */

      function createTextParticles(seed) {

        for(var quantity = 0, len = seed; quantity < len; quantity++) {

          var radius = randomBetween(0, 4);
          var hasBorn = !(radius > 0 || radius < 4);

          text.push({

            x: getRandom(0, innerWidth),
            y: getRandom(0, innerHeight),

            hasBorn: hasBorn,

            ease: Math.random() * 0.5,
            bornSpeed: Math.random() * 0.001,

            radius: radius,
            maxRadius: 4,

            interactive: false
          });

        }

      }

      /*
       * Update the current text to a new one.
       */

      function updateText() {

        // Clear immediately the screen
        clear();

        context.font = '900 ' + 170 + 'px Arial, sans-serif';
        context.textAlign = 'center';

        context.fillText(word, canvas.width * 0.5, innerHeight * 0.5);

        var surface = context.getImageData(0, 0, canvas.width, canvas.height);

        for(var width = 0; width < surface.width; width += 8) {

          for(var height = 0; height < surface.height; height += 8) {

            var color = surface.data[(height * surface.width * 4) + (width * 4) - 1];

            // The pixel color is white? So draw on it...
            if(color === 255) {

              nextText.push({

                x: width + ~~(Math.random() * 10),
                y: height + ~~(Math.random() * 10),

                orbit: 0, //randomBetween(1, 3),
                angle: 0

              });

            }

          }

        }

        var seed = nextText.length;

        // Recreate text particles, based on this seed
        createTextParticles(seed);

      }

      /*
       * Transitions handler.
       */

      function updateTransition() {

        /* --- Text ---- */
        [].forEach.call(nextText, function(particle, index) {

          if(!text[index].interactive) {

            text[index].x += ((particle.x + Math.cos(particle.angle + index) * particle.orbit) - text[index].x) * 0.008;
            text[index].y += ((particle.y + Math.sin(particle.angle + index) * particle.orbit) - text[index].y) * 0.008;

          }

          else {

            text[index].x += ((mouse.x + Math.sin(particle.angle) * 30) - text[index].x) * 0.08;
            text[index].y += ((mouse.y + Math.cos(particle.angle) * 30) - text[index].y) * 0.08;

          }

          particle.angle += 0.08;

        });

        // Remove extra particles
        if(nextText.length < text.length) {

          var extra = [].slice.call(text, nextText.length, text.length);

          // Remove extra text particles
          for(var index = 0; index < extra.length; index++)

            text.splice(index, 1);

        }

      }

      /*
       * Loop logic.
       */

      function loop() {
        clear();
        update();
        render();

        requestAnimFrame(loop);
      }

      /*
       * Clear the whole screen.
       */

      function clear() {
        context.clearRect(0, 0, canvas.width, canvas.height);
      }

      /*
       * Update the particles.
       */

      function update() {

        updateTransition();


        [].forEach.call(text, function(particle, index) {

          particle.alpha += (particle.maxAlpha - particle.alpha) * 0.05;

          if(particle.hasBorn) {

            particle.radius += (0 - particle.radius) * particle.bornSpeed;

            if(Math.round(particle.radius) === 0)

              particle.hasBorn = false;

          }

          if(!particle.hasBorn) {

            particle.radius += (particle.maxRadius - particle.radius) * particle.bornSpeed;

            if(Math.round(particle.radius) === particle.maxRadius)

              particle.hasBorn = true;

          }

          distanceTo(mouse, particle) <= particle.radius + 30 ? particle.interactive = true : particle.interactive = false;

        });

      }

      /*
       * Render the particles.
       */

      function render() {


        [].forEach.call(text, function(particle, index) {

          context.save();
          context.globalAlpha = particle.alpha;
          context.fillStyle = 'rgb(34, 34, 34)';
          context.beginPath();
          context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
          context.fill();
          context.restore();

        });

      }

      /*
       * Distance between two points.
       */

      function distanceTo(pointA, pointB) {
        var dx = Math.abs(pointA.x - pointB.x);
        var dy = Math.abs(pointA.y - pointB.y);

        return Math.sqrt(dx * dx + dy * dy);
      }

      /*
       * Useful function for random integer between [min, max].
       */

      function randomBetween(min, max) {
        return ~~(Math.random() * (max - min));
      }

      /*
       * Request new frame by Paul Irish.
       * 60 FPS.
       */

      window.requestAnimFrame = (function() {

        return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          window.oRequestAnimationFrame      ||
          window.msRequestAnimationFrame     ||

          function(callback) {

            window.setTimeout(callback, 1000 / FPS);

          };

      })();

      window.addEventListener ? window.addEventListener('load', init, false) : window.onload = init;

    })();

  }

  render() {

    return (
      <div>
        <div className="particles-text"></div>
      </div>
    );
  }

}


// @return {float} a random number between min and max
function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

// @return {integer} a random int between min and max
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}


