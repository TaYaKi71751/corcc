import React, { Component } from 'react';
import Twemoji from 'react-twemoji';
import thousands from 'thousands';

class Data extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      Object.entries(this.props.data).map(([k, v]) => {
        return (<div
          className="center-width item">
          <Twemoji options={{ className: 'twemoji' }}>
            <div
              className={this.props.emoji[k]}
              title={this.props.description[k]}>
              {this.props.emoji[k]}
            </div>
          </Twemoji>
          <div
            className="value"
            title={`${v}`.lastIndexOf("-") != `${v}`.indexOf("-") ? v : thousands(`${v}`)}>
            {`${v}`.lastIndexOf("-") != `${v}`.indexOf("-") ? v : thousands(`${v}`)}
          </div>
        </div>)
      })
    );
  }
}

export default Data;
