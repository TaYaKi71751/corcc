import '../../css/center.css';
import '../../css/covid.css';
import '../../css/fonts.css';
import '../../css/main.css';
import { random } from '../Random';
import Cases from './Cases';
import Vaccinations from './Vaccinations';

import React, { Component } from 'react';
class Init extends Component {
  render() {
    return (
      <div className="center">
        <div className="covid center">
          <Cases />
          <Vaccinations />
        </div>
      </div>
    );
  }
}

export default Init;