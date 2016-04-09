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
        <div className="Footer-item small names">
          <span className="Footer-names">JOEL KENNEDY + <a href="mailto:me@manuelyang.com?subject=Business%20Inquiry%20-%20Contract%20Work">MANNY YANG</a> © 2015</span>
        </div>
        <div className="Footer-item center links">
          <div className="Footer-links">
            <a href="#" className="work-link link link--kukuri"><span>Work</span></a>
            <a href="/jk_resume_v1.pdf" className="link link--kukuri">
              <span>Resume</span>
            </a>
            <a href="https://www.behance.net/jtotheoel" className="link social link--kukuri"><i className="fa fa-behance social"></i></a>
            <a href="https://www.linkedin.com/in/joel-kennedy-25334615" className="link social link--kukuri"><i className="fa fa-linkedin social"></i></a>
          </div>
        </div>
        <div className="Footer-item logo">
          <div id="FooterLogo">
          </div>
        </div>
      </div>
    );
  }

}
