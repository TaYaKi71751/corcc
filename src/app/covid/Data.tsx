import React, { Component } from 'react';
import twemoji from 'twemoji';
import { thousands } from '../util/thousands';

class Data extends Component {
  props:any;
  constructor(props:any) {
    super(props);
  }

  

  render() {
    return (
      Object.entries(this.props.data).map(([k, v]:any) => {
        const {emoji,description} = {
          emoji:this.props.emoji[k],
          description:this.props.description[k],
        };
        console.log(`dangerouslySetInnerHTML:`,emoji);
        return (<div
          className="center-width item">
            <div
              className={emoji}
              title={description}
              dangerouslySetInnerHTML={
                {__html: twemoji.parse(emoji)}
            }
              >
            </div>
          <div
            className="value"
            title={v}>
            {`${v}`.lastIndexOf("-") != `${v}`.indexOf("-") ? v : thousands(`${v}`)}
          </div>
        </div>)
      })
    );
  }
}

export default Data;
