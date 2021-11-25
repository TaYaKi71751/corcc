import React, { Component } from 'react';
import Twemoji from 'twemoji';
import { thousands } from '../util/thousands';

class Data extends Component {
  props:any;
  constructor(props:any) {
    super(props);
  }
  render() {
    return (
      Object.entries(this.props.data).map(([k, v]:any) => {
        return (<div
          className="center-width item">
            <div
              className={this.props.emoji[k]}
              title={this.props.description[k]}>
              {this.props.emoji[k]}
            </div>
          <div
            className="value"
            title={`${v}`.lastIndexOf("-") != `${v}`.indexOf("-") ? v : thousands(`${v}`)}>
              {/* {`${}`} */}
            {`${v}`.lastIndexOf("-") != `${v}`.indexOf("-") ? v : thousands(`${v}`)}
          </div>
        </div>)
      })
    );
  }
}

export default Data;
