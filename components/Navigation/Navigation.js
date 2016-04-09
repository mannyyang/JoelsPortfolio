/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React, { Component } from 'react';
import './Navigation.scss';

export default class extends Component {


  render() {
    return (
      <ul className="Navigation" role="menu">
        <li className="Navigation-item mobile">
          <a id="nav-toggle" href="#"><span></span></a>
          <div id="mobile-menu">
            <ul>
              <li><a href="#" className="mobile-link">WORK</a></li>
              <li><a href="/jk_resume_v1.pdf" target="_blank">RESUME</a></li>
              <li>
                <a href="https://www.behance.net/jtotheoel"><i className="fa fa-behance"></i></a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/joel-kennedy-25334615"><i className="fa fa-linkedin"></i></a>
              </li>
            </ul>
          </div>
        </li>
        <li className="Navigation-item link link--kukuri">
          <a href="/jk_resume_v1.pdf" target="_blank">
            <span>Resume</span>
          </a>
        </li>
        <li className="Navigation-item link link--kukuri work-link">
          <a href="#">
            <span>Work</span>
          </a>
        </li>
        <li className="Navigation-item center intro-link">
          <div id="HeaderLogo">
          </div>
        </li>
        <li className="Navigation-item right social link link--kukuri">
          <span><a href="https://www.behance.net/jtotheoel"><i className="fa fa-behance"></i></a></span>
        </li>
        <li className="Navigation-item right social link link--kukuri">
          <span><a href="https://www.linkedin.com/in/joel-kennedy-25334615"><i className="fa fa-linkedin"></i></a></span>
        </li>
      </ul>
    );
  }

}
