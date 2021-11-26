import React, { Component } from 'react';
import '../../css/center.css';
import '../../css/covid.css';
import '../../css/fonts.css';
import '../../css/main.css';
import Cases from './Cases';
import Vaccinations from './Vaccinations';

class Page extends Component {
  props:any;

  render() {
    const cases = (typeof this.props.case == 'undefined') ? (<div />) : (<Cases />);
    const vaccination = (typeof this.props.vaccination == 'undefined') ? (<div />) : (<Vaccinations />);
    return (
      <div className="center">
        <div className="covid center">
          {cases}
          {vaccination}
        </div>
      </div>
    );
  }
}

export default Page;