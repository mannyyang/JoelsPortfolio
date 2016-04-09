import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import Footer from '../components/Footer/Footer.js';

export default class HomePage extends Component {
  constructor(props){
    super(props);

    this.state = {
      height: 'initial'
    };
  }

  componentDidMount(){

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
      var word = title.toUpperCase().split("").join(String.fromCharCode(8202)); //'STINK DIGITAL' ;

      /*
       * Init.
       */
      function init() {

        var particlesContainer = document.querySelector('.particles-text');

        canvas = document.createElement('canvas');
        canvas.width = innerWidth ;
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
        canvas.height = window.innerHeight;

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

      function createTextParticles(seed, rad) {

        if (rad)
        {
          for(var quantity = 0, len = seed; quantity < len; quantity++) {

            var radius = randomBetween(rad.min, rad.max);
            var hasBorn = !(radius > rad.min || radius < rad.max);

            text.push({

              x: getRandom(0, innerWidth),
              y: getRandom(0, innerHeight),

              hasBorn: hasBorn,

              ease: Math.random() * 0.005,
              bornSpeed: Math.random() * 0.01,

              radius: radius,
              maxRadius: rad.max,

              interactive: false
            });

          }
        }
        else {
          for(var quantity = 0, len = seed; quantity < len; quantity++) {

            var radius = randomBetween(0, 3);
            var hasBorn = !(radius > 0 || radius < 3);

            text.push({

              x: getRandom(0, innerWidth),
              y: getRandom(0, innerHeight),

              hasBorn: hasBorn,

              ease: Math.random() * 0.005,
              bornSpeed: Math.random() * 0.01,

              radius: radius,
              maxRadius: 3,

              interactive: false
            });

          }
        }


      }

      /*
       * Update the current text to a new one.
       */

      function updateText() {

        // Clear immediately the screen
        clear();

        var currWidth = window.innerWidth;
        var fontSize = 200;

        if (currWidth >= 1800){
          context.font = '900 375px NewHouseDTS, Arial';
          context.textAlign = 'center';

          context.fillText(word, canvas.width * 0.5, innerHeight * 0.55);

          var surface = context.getImageData(0, 0, canvas.width, canvas.height);

          for(var width = 0; width < surface.width; width += 10) {

            for(var height = 0; height < surface.height; height += 10) {

              var color = surface.data[(height * surface.width * 4) + (width * 4) - 1];

              // The pixel color is white? So draw on it...
              if(color === 255) {

                nextText.push({

                  x: width - ~~(Math.random() * 6.5),
                  y: height + ~~(Math.random() * 6.5),

                  orbit: getRandom(-1, 1),
                  angle: 0.01

                });

              }

            }

          }

          var seed = nextText.length;
          var radius = {min: 2, max: 4};

          // Recreate text particles, based on this seed
          createTextParticles(seed, radius);
        }
        else if (currWidth >= 1200 && currWidth < 1800){
          context.font = '900 210px NewHouseDTS, Arial';
          context.textAlign = 'center';

          context.fillText(word, canvas.width * 0.5, innerHeight * 0.55);

          var surface = context.getImageData(0, 0, canvas.width, canvas.height);

          for(var width = 0; width < surface.width; width += 8) {

            for(var height = 0; height < surface.height; height += 8) {

              var color = surface.data[(height * surface.width * 4) + (width * 4) - 1];

              // The pixel color is white? So draw on it...
              if(color === 255) {

                nextText.push({

                  x: width - ~~(Math.random() * 5),
                  y: height + ~~(Math.random() * 5),

                  orbit: getRandom(-1, 1),
                  angle: 0.01

                });

              }

            }

          }

          var seed = nextText.length;

          // Recreate text particles, based on this seed
          createTextParticles(seed);
        }
        else if (currWidth >= 992 && currWidth < 1200){
          context.font = '900 155px NewHouseDTS, Arial';
          context.textAlign = 'center';

          context.fillText(word, canvas.width * 0.5, innerHeight * 0.45);
          context.fillText(word, canvas.width * 0.5, innerHeight * 0.65);

          var surface = context.getImageData(0, 0, canvas.width, canvas.height);

          for(var width = 0; width < surface.width; width += 6) {

            for(var height = 0; height < surface.height; height += 6) {

              var color = surface.data[(height * surface.width * 4) + (width * 4) - 1];

              // The pixel color is white? So draw on it...
              if(color === 255) {

                nextText.push({

                  x: width - ~~(Math.random() * 5),
                  y: height + ~~(Math.random() * 5),

                  orbit: getRandom(-1, 1),
                  angle: 0.01

                });

              }

            }

          }

          var seed = nextText.length;

          // Recreate text particles, based on this seed
          createTextParticles(seed, {min: 0, max: 2});
        }
        else if (currWidth >= 768 &&currWidth < 992){
          context.font = '900 120px NewHouseDTS, Arial';
          context.textAlign = 'center';

          context.fillText(word, canvas.width * 0.5, innerHeight * 0.45);
          context.fillText(word, canvas.width * 0.5, innerHeight * 0.65);

          var surface = context.getImageData(0, 0, canvas.width, canvas.height);

          for(var width = 0; width < surface.width; width += 5) {

            for(var height = 0; height < surface.height; height += 5) {

              var color = surface.data[(height * surface.width * 4) + (width * 4) - 1];

              // The pixel color is white? So draw on it...
              if(color === 255) {

                nextText.push({

                  x: width - ~~(Math.random() * 5),
                  y: height + ~~(Math.random() * 5),

                  orbit: getRandom(-1, 1),
                  angle: 0.01

                });

              }

            }

          }

          var seed = nextText.length;

          // Recreate text particles, based on this seed
          createTextParticles(seed, {min: 0, max: 2});
        }
        else {

        }

      }

      /*
       * Transitions handler.
       */

      function updateTransition() {

        var radius = 150;

        /* --- Text ---- */
        [].forEach.call(nextText, function(particle, index) {

          if(!text[index].interactive) {
            text[index].x += ((particle.x + Math.cos(particle.angle + index) * particle.orbit) - text[index].x) * 0.06;
            text[index].y += ((particle.y + Math.sin(particle.angle + index) * particle.orbit) - text[index].y) * 0.06;
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

  }

  render() {

    return (
      <div className="wrapper">

        <div className="Home-Page">
          <span id="Hello" className="main-hello">Hello,</span>
          <span id="Hello2">Hello,</span>
          <div className="particles-text"></div>
          <span id="Mobile-Name"></span>
        </div>
        <div className="Work-Page" >
          <Grid fluid={true}>
            <Row>
              <Col className="Tile-container" xs={12} sm={6} md={6} lg={3}>
                <a href="https://www.behance.net/gallery/29940187/Butterfinger-Website-Redesign" target="_blank">
                  <div className="Tile">
                      <img src="http://i.imgur.com/ZSqwayY.jpg" alt="Butterfinger" />
                  </div>
                  <div className="Tile-title">
                    Butterfinger <br/> Redesign
                  </div>
                  <span className="Tile-subtitle">
                    website redesign
                  </span>

                  <div className="Tile-overlay">
                    <div className="rectangle">
                    </div>
                  </div>
                </a>
              </Col>
              <Col className="Tile-container" xs={12} sm={6} md={6} lg={3}>
                <a href="https://www.behance.net/gallery/29850167/Muscle-Milk-Stronger-Everyday" target="_blank">
                  <div className="Tile">
                    <img src="http://i.imgur.com/Dh91CPE.jpg" alt="Stronger Everyday"/>
                  </div>
                  <div className="Tile-title">
                    Muscle Milk <br/>Pitch
                  </div>
                <span className="Tile-subtitle">
                  campaign work
                </span>

                  <div className="Tile-overlay">
                    <div className="rectangle">
                    </div>
                  </div>
                </a>
              </Col>
              <Col className="Tile-container" xs={12} sm={6} md={6} lg={3}>
                <a href="https://www.behance.net/gallery/30095651/Sweetarts" target="_blank">
                  <div className="Tile">
                    <img src="http://i.imgur.com/EfVXKjv.jpg" alt="Sweet Tarts"/>
                  </div>
                  <div className="Tile-title">
                    Sweetarts <br/>Re&#45;launch
                  </div>
                <span className="Tile-subtitle">
                  campaign work
                </span>

                  <div className="Tile-overlay">
                    <div className="rectangle">
                    </div>
                  </div>
                </a>
              </Col>
              <Col className="Tile-container" xs={12} sm={6} md={6} lg={3}>
                <a href="https://www.behance.net/gallery/30026173/Butterfinger-Cups-Perfecter" target="_blank">
                  <div className="Tile">
                    <img src="http://i.imgur.com/0nrsoM5.jpg" alt="Reeces"/>
                  </div>
                  <div className="Tile-title">
                    Butterfinger <br/> 'Perfecter'
                  </div>
                <span className="Tile-subtitle">
                  animated videos
                </span>

                  <div className="Tile-overlay">
                    <div className="rectangle">
                    </div>
                  </div>
                </a>
              </Col>
            </Row>
            <Row>
              <Col className="Tile-container" xs={12} sm={6} md={6} lg={3}>
                <a href="https://www.behance.net/gallery/30002559/The-Peanuts-Movie" target="_blank">
                  <div className="Tile">
                    <img src="http://i.imgur.com/aW7Vimh.jpg" alt="Peanuts"/>
                  </div>
                  <div className="Tile-title fadeInDuration">
                    The peanuts &amp; <br/>Nestle crunch
                  </div>
                  <span className="Tile-subtitle">
                    social
                  </span>

                  <div className="Tile-overlay">
                    <div className="rectangle">
                    </div>
                  </div>
                </a>
              </Col>
              <Col className="Tile-container" xs={12} sm={6} md={6} lg={3}>
                <div className="Tile">
                  <img src="http://i.imgur.com/7JavQNy.jpg" alt="Butterfinger"/>
                </div>
                <div className="Tile-title fadeInDuration">
                  Butterfinger <br/> Pinterest
                </div>
                <span className="Tile-subtitle">
                  photoshoot
                </span>

                <div className="Tile-overlay">
                  <div className="rectangle">
                  </div>
                </div>
              </Col>
              <Col className="Tile-container" xs={12} sm={6} md={6} lg={3}>
                <a href="https://www.behance.net/gallery/29847505/Butterfinger-Get-In-Our-Corner" target="_blank">
                  <div className="Tile">
                    <img src="http://i.imgur.com/iUMsaWo.jpg" alt="Reeces"/>
                  </div>
                  <div className="Tile-title fadeInDuration">
                    Butterfinger <br/>'Get in our corner'
                  </div>
                  <span className="Tile-subtitle">
                    social
                  </span>

                  <div className="Tile-overlay">
                    <div className="rectangle">
                    </div>
                  </div>
                </a>
              </Col>
              <Col className="Tile-container" xs={12} sm={6} md={6} lg={3}>
                <a href="https://www.behance.net/gallery/30043421/Whitstik-Surfboard-Repair" target="_blank">
                  <div className="Tile">
                    <img src="http://i.imgur.com/nW4fjH4.jpg" alt="The Details"/>
                  </div>
                  <div className="Tile-title fadeInDuration">
                    whitstik redesign
                  </div>
                  <span className="Tile-subtitle">
                    website redesign
                  </span>

                  <div className="Tile-overlay">
                    <div className="rectangle">
                    </div>
                  </div>
                </a>
              </Col>
            </Row>
          </Grid>
          <Footer />
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
