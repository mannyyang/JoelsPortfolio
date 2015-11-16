import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

export default class HomePage extends Component {
  constructor(props){
    super(props);

    this.state = {
      height: 'initial'
    };
  }

  componentDidMount(){

    // TODO: remove from page component
    // particle text
    (function() {

      var canvas,
        context,
        particles = [],
        text = [],
        nextText = [],
        mouse = { x: -99999, y: -99999 },
        FPS = 60;

      /*
       * List words.
       */
      var title = decodeURIComponent(window.location.hash.substring(1));
      var word = title.toUpperCase(); //'STINK DIGITAL' ;

      /*
       * Init.
       */
      function init() {

        var particlesContainer = document.querySelector('.particles-text');

        canvas = document.createElement('canvas');
        canvas.width = innerWidth ;
        canvas.height = innerHeight - 215;

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

            ease: Math.random() * 0.005,
            bornSpeed: Math.random() * 0.01,

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

        context.fillText(word, canvas.width * 0.5, innerHeight * 0.42);

        var surface = context.getImageData(0, 0, canvas.width, canvas.height);

        for(var width = 0; width < surface.width; width += 8) {

          for(var height = 0; height < surface.height; height += 8) {

            var color = surface.data[(height * surface.width * 4) + (width * 4) - 1];

            // The pixel color is white? So draw on it...
            if(color === 255) {

              nextText.push({

                x: width - ~~(Math.random() * 10),
                y: height + ~~(Math.random() * 10),

                orbit: getRandom(1, 3),
                angle: 0.1

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

        var radius = 150;

        /* --- Text ---- */
        [].forEach.call(nextText, function(particle, index) {

          if(!text[index].interactive) {
            text[index].x += ((particle.x + Math.cos(particle.angle + index) * particle.orbit) - text[index].x) * 0.04;
            text[index].y += ((particle.y + Math.sin(particle.angle + index) * particle.orbit) - text[index].y) * 0.04;
          }
          else {

            if (text[index].x <= mouse.x && text[index].y <= mouse.y){
              text[index].x = text[index].x - ~~(radius / distanceTo(text[index], mouse));
              text[index].y = text[index].y - ~~(radius / distanceTo(text[index], mouse));



              text[index].x += ((particle.x + Math.sin(particle.angle + 100) * 20) - text[index].x) * 0.08;
              text[index].y += ((particle.y + Math.cos(particle.angle + 100) * 20) - text[index].y) * 0.08;
            }
            if (text[index].x <= mouse.x && text[index].y >= mouse.y){
              text[index].x = text[index].x - ~~(radius / distanceTo(text[index], mouse));
              text[index].y = text[index].y + ~~(radius / distanceTo(text[index], mouse));

              text[index].x += ((particle.x + Math.sin(particle.angle + 100) * 20) - text[index].x) * 0.08;
              text[index].y += ((particle.y + Math.cos(particle.angle + 100) * 20) - text[index].y) * 0.08;
            }
            if (text[index].x >= mouse.x && text[index].y >= mouse.y){
              text[index].x = text[index].x + ~~(radius / distanceTo(text[index], mouse));
              text[index].y = text[index].y + ~~(radius / distanceTo(text[index], mouse));

              text[index].x += ((particle.x + Math.sin(particle.angle + 100) * 20) - text[index].x) * 0.08;
              text[index].y += ((particle.y + Math.cos(particle.angle + 100) * 20) - text[index].y) * 0.08;
            }
            if (text[index].x >= mouse.x && text[index].y <= mouse.y){
              text[index].x = text[index].x + ~~(radius / distanceTo(text[index], mouse));
              text[index].y = text[index].y - ~~(radius / distanceTo(text[index], mouse));

              text[index].x += ((particle.x + Math.sin(particle.angle + 100) * 20) - text[index].x) * 0.08;
              text[index].y += ((particle.y + Math.cos(particle.angle + 100) * 20) - text[index].y) * 0.08;
            }

          }

          particle.angle += 0.04;

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

          distanceTo(mouse, particle) <= particle.radius + 90 ? particle.interactive = true : particle.interactive = false;

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
          context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 4);
          context.fill();
          context.restore();

        });

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

      init();

    })();

    // TODO: make into separate component
    // background particles
    particlesJS("particles-js", {
      "particles": {
        "number": {
          "value": 30,
          "density": {
            "enable": true,
            "value_area": 800
          }
        },
        "color": {
          "value": "#222222"
        },
        "shape": {
          "type": "circle",
          "stroke": {
            "width": 0,
            "color": "#000000"
          },
          "polygon": {
            "nb_sides": 5
          },
          "image": {
            "src": "",
            "width": 100,
            "height": 100
          }
        },
        "opacity": {
          "value": 1,
          "random": true,
          "anim": {
            "enable": true,
            "speed": 0.5,
            "opacity_min": 0.0,
            "sync": false
          }
        },
        "size": {
          "value": 3,
          "random": true,
          "anim": {
            "enable": false,
            "speed": 40,
            "size_min": 0.1,
            "sync": false
          }
        },
        "line_linked": {
          "enable": false,
          "distance": 50,
          "color": "#222222",
          "opacity": 0.3,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 6,
          "direction": "none",
          "random": false,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
          "attract": {
            "enable": false,
            "rotateX": 600,
            "rotateY": 1200
          }
        }
      },
      "interactivity": {
        "detect_on": "window",
        "events": {
          "onhover": {
            "enable": true,
            "mode": "push"
          },
          "onclick": {
            "enable": false,
            "mode": "push"
          },
          "resize": true
        },
        "modes": {
          "grab": {
            "distance": 140,
            "line_linked": {
              "opacity": 1
            }
          },
          "bubble": {
            "distance": 400,
            "size": 40,
            "duration": 2,
            "opacity": 8,
            "speed": 3
          },
          "repulse": {
            "distance": 200,
            "duration": 0.4
          },
          "push": {
            "particles_nb": 4
          },
          "remove": {
            "particles_nb": 2
          }
        }
      },
      "retina_detect": true
    });

    var workpageHeight = window.innerHeight - 215;
    this.setState({
      height: workpageHeight/2 + "px"
    });
  }

  render() {

    return (
      <div className="wrapper">
        <div className={"Home-Page " + this.state.fadeIn}>
          <span id="Hello" className="tk-bebas-neue">Hello,</span>
          <img id="Arrow" className="pulse work-link" src="http://i.imgur.com/vEjcmNs.png" alt=""/>
          <div id="particles-js"></div>
          <div className="particles-text"></div>
        </div>
        <div className="Work-Page" >
          <Grid fluid={true}>
            <Row>
              <Col className="Tile-container" md={3} style={{height: this.state.height}}>
                <div className="Tile">
                  <img src="http://i.imgur.com/gZONIZF.jpg" alt="Butterfinger" />
                </div>
              </Col>
              <Col className="Tile-container" md={3} style={{height: this.state.height}}>
                <div className="Tile">
                  <img src="http://i.imgur.com/qXPqHAr.jpg" alt="Stronger Everyday"/>
                </div>
              </Col>
              <Col className="Tile-container" md={3} style={{height: this.state.height}}>
                <div className="Tile">
                  <img src="http://i.imgur.com/EfVXKjv.jpg" alt="Sweet Tarts"/>
                </div>
              </Col>
              <Col className="Tile-container" md={3} style={{height: this.state.height}}>
                <div className="Tile">
                  <img src="http://i.imgur.com/IVy7yok.jpg" alt="Reeces"/>
                </div>
              </Col>
            </Row>
            <Row>
              <Col className="Tile-container" md={3} style={{height: this.state.height}}>
                <div className="Tile">
                  <img src="http://i.imgur.com/ZCwYvEa.jpg" alt="Peanuts"/>
                </div>
              </Col>
              <Col className="Tile-container" md={3} style={{height: this.state.height}}>
                <div className="Tile">
                  <img src="http://i.imgur.com/CNBGq5f.jpg" alt="Butterfinger"/>
                </div>
              </Col>
              <Col className="Tile-container" md={3} style={{height: this.state.height}}>
                <div className="Tile">
                  <img src="http://i.imgur.com/z7d32nA.jpg" alt="Reeces"/>
                </div>
              </Col>
              <Col className="Tile-container" md={3} style={{height: this.state.height}}>
                <div className="Tile">
                  <img src="http://i.imgur.com/mDVIxFh.jpg" alt="The Details"/>
                </div>
              </Col>
            </Row>
          </Grid>
        </div>
      </div>

    );
  }

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

// @return {float} a random number between min and max
function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}
