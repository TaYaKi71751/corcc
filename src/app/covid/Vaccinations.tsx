import React, { Component } from 'react';
import { randomGradientBackground } from '../Random';
import { source } from './tmp/S'
import { emoji, desc } from './tmp/V';
import Title from './Title';
import Data from './Data';

class Cases extends Component {
  props: any;
  constructor(props: any) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch("https://corcc.github.io/corcc/vaccination/counter.json")
      .then(res => res.json())
      .then(
        (jsonData) => {
          this.setState({
            isLoaded: true,
            jsonData,
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, jsonData }: any = this.state;
    const { symbol } = emoji;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else {
      return (
        Object.entries(jsonData || { "null": "null" }).map(([day, dayData]) => {
          if (!day.includes("day") && isLoaded) return null;
          return (
            <div className="pad-1pc">
              <div
                className={`${symbol}${symbol} items ${day}`}
                style={{ background: `${randomGradientBackground('to left bottom', 2)}` }}>
                {(() => {
                  return (<Title source={source} symbol={symbol} dTyp={!isLoaded ? undefined : emoji[day]} />);
                })()}
                {(() => {
                  return (!(isLoaded) ? (<div />) : (<Data data={dayData} emoji={emoji} description={!isLoaded ? undefined : desc} />));
                })()}
              </div>
            </div>);
        })
      );
    }
  }
}

export default Cases;
