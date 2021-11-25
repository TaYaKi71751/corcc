import React, { Component } from 'react';
import Twemoji from 'twemoji';

class Title extends Component {
  props: any;
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <a
        className={`${this.props.symbol}${this.props.symbol} source`}
        href={this.props.source.href}
        title={this.props.source.title}>
        <div className={`${this.props.symbol} sym`} style={{ padding: '0.2em' }}>
          {/* {Twemoji.parse(`🇰🇷${this.props.dTyp || ""}${this.props.symbol}`)} */}
          {`🇰🇷${this.props.dTyp || ""}${this.props.symbol}`}
        </div>
      </a>
    );
  }
}

export default Title;
