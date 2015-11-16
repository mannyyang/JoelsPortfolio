/**
 * React Static Boilerplate
 * https://github.com/koistya/react-static-boilerplate
 * Copyright (c) Konstantin Tarkus (@koistya) | MIT license
 */

import React, { Component } from 'react';
import './Footer.scss';

export default class extends Component {

  render() {
    return (
      <div className="Footer">
        <div className="Footer-item small">
          <span>JOEL KENNEDY + MANNY YANG @ 2015</span>
        </div>
        <div className="Footer-item center">
          <div className="Footer-links">
            <a href="#" className="work-link"><span>Work</span></a>
            <a href="/jk_resume_v1.pdf">
              <span>Resume</span>
            </a>
            <a href="#"><i className="fa fa-behance social"></i></a>
            <a href="#"><i className="fa fa-linkedin social"></i></a>
          </div>
        </div>
        <div className="Footer-item">
          <img src="http://i.imgur.com/ZcPCEQs.gif" alt=""/>
        </div>
      </div>
    );
  }

}
