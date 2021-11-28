import React, { Component } from 'react';
import { randomGradientBackground } from '../Random';
import { source } from './tmp/S'
import { emoji, desc } from './tmp/C';
import Title from './Title';
import Data from './Data';

class Cases extends Component {
  source: any;
  constructor(props: any) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch("https://corcc.github.io/corcc/case/counter.json")
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
    const { symbol, latest } = emoji;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else {
      return (
        <div className="pad-1pc">
          <div
            className={`${symbol}${symbol} items`}
            style={{ background: `${randomGradientBackground('to left bottom', 2)}` }}>
            {(() => {
              return (<Title source={source} symbol={symbol} dTyp={!isLoaded ? undefined : latest} />);
            })()}
            {(() => {
              return (!(isLoaded) ? (<div />) : (<Data data={jsonData} emoji={emoji} description={!isLoaded ? undefined : desc} />));
            })()}
          </div>
        </div>
      );
    }
  }
}

export default Cases;
