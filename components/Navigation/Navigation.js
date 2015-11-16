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
        <li className="Navigation-item">
          <a href="/jk_resume_v1.pdf" target="_blank">
            <span>Resume</span>
          </a>
        </li>
        <li className="Navigation-item work-link">
          <a href="#">
            <span>Work</span>
          </a>
        </li>
        <li className="Navigation-item center intro-link">
          <img src="http://i.imgur.com/ZcPCEQs.gif" alt=""/>
        </li>
        <li className="Navigation-item right social">
          <span><i className="fa fa-behance"></i></span>
        </li>
        <li className="Navigation-item right social">
          <span><i className="fa fa-linkedin"></i></span>
        </li>
      </ul>
    );
  }

}
