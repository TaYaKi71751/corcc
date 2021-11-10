import React, { Component } from 'react';
import { Oval } from 'react-loading-icons';

class Loading extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Oval stroke="#2070d0e0" strokeOpacity={.125} speed={.75} />
    );
  }
}

export default Loading;
