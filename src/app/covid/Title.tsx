import React, { Component } from 'react';
import twemoji from 'twemoji'

class Title extends Component {
  props: any;

  render() {
    const { symbol, source, dTyp } = this.props;
    const {
      innerEmoji,
      sourceClassEmoji,
      symbolClassEmoji
    } = {
      innerEmoji: `🇰🇷${dTyp || ""}${symbol}`,
      sourceClassEmoji: `${symbol}${symbol} source`,
      symbolClassEmoji: `${symbol} sym`,
    };
    return (
      <a
        className={sourceClassEmoji}
        href={source.href}
        title={source.title}>
        <div
          className={symbolClassEmoji}
          style={{ padding: '0.2em' }}
          dangerouslySetInnerHTML={{ __html: twemoji.parse(innerEmoji) }}
        >
        </div>
      </a>
    );
  }
}

export default Title;
