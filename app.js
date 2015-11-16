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
    $('#Loading').stop().fadeOut('medium', "swing", function(){
      run();

      $('.work-link').click(function(){
        $('.Home-Page').stop().animate({
          top: '-' + $('.Home-Page').height() + 'px'
        }, 1000, 'easeOutCubic');
      });

      $('.intro-link').click(function(){
        $('.Home-Page').stop().animate({
          top: 0
        }, 1000, 'easeInCubic');
      });

      setTimeout(function(){
        $('.Work-Page').stop().fadeIn(2000);
      }, 500);
    });
  };
}


export default { route, routes };
