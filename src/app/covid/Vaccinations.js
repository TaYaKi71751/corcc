import React, { Component } from 'react';
import { randomGradientBackground } from '../Random';
import { source } from './tmp/S'
import { emoji, desc } from './tmp/V';
import Twemoji from 'react-twemoji';
import thousands from 'thousands';


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
    fetch("https://corcc.github.io/corcc/vaccination/latest.json")
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
    this.emoji = emoji(), this.desc = desc()
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          {
            Object.entries(jsonData).map(([day, dayData]) => {
              if (!day.includes("day")) return;
              return (
                <div className="pad-1pc">
                  <div
                    className={`${this.emoji['symbol']}${this.emoji['symbol']} items `}
                    style={{ background: `${randomGradientBackground('to left bottom', 2)}` }}>
                    <a
                      className={`${this.emoji['symbol']}${this.emoji['symbol']} source`}
                      href={this.source.href}
                      title={this.source.title}>
                      <Twemoji options={{ className: 'twemoji' }}>
                        <div className={`${this.emoji['symbol']} sym`}>
                          {`${this.emoji[day]}${this.emoji['symbol']}`}
                        </div>
                      </Twemoji>
                    </a>
                    {
                      Object.entries(dayData).map(([k, v]) => {
                        return (<div
                          className="center-width item">
                          <Twemoji options={{ className: 'twemoji' }}>
                            <div
                              className={this.emoji[k]}>
                              {this.emoji[k]}
                            </div>
                          </Twemoji>
                          <div
                            className="value">
                            {v.lastIndexOf("-") != v.indexOf("-") ? v : thousands(v)}
                          </div>
                        </div>)
                      }
                      )
                    }
                  </div>
                </div>);
            })
          }
        </div>
      );
    }
  }
}

export default Cases;
