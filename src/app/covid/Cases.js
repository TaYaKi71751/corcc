import React, { Component } from 'react';
import { randomGradientBackground } from '../Random';
import { source } from './tmp/S'
import { emoji, desc } from './tmp/C';
import Title from './Title';
import Loading from './Loading';
import Data from './Data';

class Cases extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }

  componentDidMount() {
    fetch("https://corcc.github.io/corcc/case/latest.json")
      .then(res => res.json())
      .then(
        (jsonData) => {
          this.setState({
            isLoaded: true,
            jsonData: jsonData,
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
    this.source = source();
    const { error, isLoaded, jsonData } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else {
      return (
        <div className="pad-1pc">
          <div
            className={`${emoji()['symbol']}${emoji()['symbol']} items`}
            style={{ background: `${randomGradientBackground('to left bottom', 2)}` }}>
            {(function (source, emoji, symbol) {
              return (<Title source={source} symbol={symbol} dTyp={emoji['latest']} dTyp={!isLoaded ? undefined : emoji['latest']} />);
            })(source(), emoji(), emoji()['symbol'])}
            {(function () {
              return (!(isLoaded) ? (<Loading />) : (<Data data={jsonData} emoji={emoji()} description={!isLoaded ? undefined : desc()} />));
            })()}
          </div>
        </div>
      );
    }
  }
}

export default Cases;
