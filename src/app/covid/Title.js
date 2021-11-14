import React, { Component } from 'react';
import Twemoji from 'react-twemoji';

class Title extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <a
        className={`${this.props.symbol}${this.props.symbol} source`}
        href={this.props.source.href}
        title={this.props.source.title}>
        <Twemoji options={{ className: 'twemoji' }}>
          <div className={`${this.props.symbol} sym`} style={{padding:'0.2em'}}>
            {`🇰🇷${this.props.dTyp||""}${this.props.symbol}`}
          </div>
        </Twemoji>
      </a>
    );
  }
}

export default Title;
