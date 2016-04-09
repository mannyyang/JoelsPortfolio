import 'babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Location from './lib/Location';
import Layout from './components/Layout';
import HomePage from './pages/index.js';

const routes = {}; // Auto-generated on build. See tools/lib/routes-loader.js

const route = async (path, callback) => {
  //const handler = routes[path] || routes['/404'];
  //const component = await handler();
  await callback(<Layout><HomePage/></Layout>);
};

function run() {
  const container = document.getElementById('app');
  Location.listen(location => {
    route('/', async (component) => ReactDOM.render(component, container, () => {

    }));
  });
}

if (typeof window !== "undefined"){
  window.onload = function(){

    setTimeout(function(){

      $('#Loading img').stop().animate({
        opacity: 0
      }, {
        duration: 250
      });

      $('#Loading').stop().animate({
        top: "-120%"
      }, 650, 'easeInCubic', function(){

        run();

        var name = window.location.hash.substr(1);

        $('#Mobile-Name').text(name);

        $('#nav-toggle').click(function(){
          $(this).toggleClass('active');
          $('#mobile-menu').toggle();
        });

        $('#HeaderLogo, #FooterLogo').sprite({fps: 15, no_of_frames: 15, play_frames: 15}).hover(function(){
          $(this).destroy();
          $(this).sprite({fps: 15, no_of_frames: 15, play_frames: 15});
        },
        function() {
          $('#sprite').sprite({fps: 0, no_of_frames: 15, start_at_frame: 15});
        });

        $('#Hello').stop().fadeIn(2500);

        $('.particles-text').click(function(){
          $('.Home-Page').stop().animate({
            top: '-' + $('.Home-Page').height() + 'px'
          }, 1000, 'easeOutCubic');
        });

        $('.mobile-link').click(function(){
          $('.Home-Page').stop().animate({
            top: '-' + $('.Home-Page').height() + 'px'
          }, 1000, 'easeOutCubic');
          $('#mobile-menu').hide();
          $('#nav-toggle').toggleClass('active');
        });

        $('.intro-link').click(function(){
          $('.Home-Page').stop().animate({
            top: 0
          }, 1000, 'easeInCubic');
        });

        $('.Work-Page').stop().fadeIn(2000);

        $('.Tile-container').hover(function(){
          $(this).find('.Tile-title').animate({
            opacity: '1'
          }, {
            queue: false,
            duration: 150
          });
          $(this).find('.Tile-subtitle').delay(400).animate({
            bottom: '10px'
          }, {
            duration: 75
          });
          $(this).find('.Tile-arrow').delay(250).animate({
            bottom: '5px'
          }, {
            duration: 100
          }).animateRotate(315, 350);
        }, function(){
          $(this).find('.Tile-title').animate({
            opacity: '0'
          }, {
            queue: false,
            duration: 200
          });

          if ($(window).height() > 1200) {
            $(this).find('.Tile-subtitle').animate({
              bottom: '-45px'
            }, {
              duration: 200
            });
          }
          else {
            $(this).find('.Tile-subtitle').animate({
              bottom: '-20px'
            }, {
              duration: 200
            });
          }

        });
      });
    }, 1000);

    $.fn.animateRotate = function(angle, duration, easing, complete) {
      var args = $.speed(duration, easing, complete);
      var step = args.step;
      return this.each(function(i, e) {
        args.complete = $.proxy(args.complete, e);
        args.step = function(now) {
          $.style(e, 'transform', 'rotate(' + now + 'deg)');
          if (step) return step.apply(e, arguments);
        };

        $({deg: -45}).delay(1500).animate({deg: angle}, args);
      });
    };
  };
}


export default { route, routes };
