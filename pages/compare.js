import React from "react";
import qs from "qs";
import Router from "next/router";
import Select from "react-select";
import Slider from "react-rangeslider";
import Meta from "../components/meta";
import Human from "../components/human";
import ResultGraph from "../components/resultGraph";

const devAndconDefault = "all";
const deviceList = [
  { value: "all", label: "All device types" },
  { value: "phone", label: "Phone" },
  { value: "tablet", label: "Tablet" },
  { value: "desktop", label: "Desktop" },
];
const connectionList = [
  { value: "all", label: "All connection types" },
  { value: "4G", label: "4G" },
  { value: "3G", label: "3G" },
  { value: "2G", label: "2G" },
  { value: "slow-2G", label: "slow-2G" },
  { value: "offline", label: "offline" },
];

class CompareComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      device: devAndconDefault,
      connection: devAndconDefault,
      time: 1,
    };

    this.handleOnDeviceChange = this.handleOnDeviceChange.bind(this);
    this.handleOnConnectionChange = this.handleOnConnectionChange.bind(this);
    this.handleOnTimeChange = this.handleOnTimeChange.bind(this);
  }

  handleOnDeviceChange(selectedOption) {
    this.setState({
      device: selectedOption.value,
    });

    // update the url
    const { query } = Router;
    query.device = selectedOption.value;
    const newURL = window.location.pathname + "?" + qs.stringify(query, { encode: false });
    Router.push(newURL, newURL, { shallow: true });
  }

  handleOnConnectionChange(selectedOption) {
    this.setState({
      connection: selectedOption.value,
    });

    // update the url
    const { query } = Router;
    query.connection = selectedOption.value;
    const newURL = window.location.pathname + "?" + qs.stringify(query, { encode: false });
    Router.push(newURL, newURL, { shallow: true });
  }

  handleOnTimeChange(selectedOption) {
    if (typeof(selectedOption) === "number") {
      this.setState({
        time: selectedOption,
      });
    }

    // update the url
    const { query } = Router;
    query.time = selectedOption;
    const newURL = window.location.pathname + "?" + qs.stringify(query, { encode: false });
    Router.push(newURL, newURL, { shallow: true });
  }

  handleToggleClick() {
    Router.push("/");
  }

  render() {
    const formatsecond = value => `${value} s`;
    return (
      <div>
        <Meta />
        <header className="dashboard--header">
          <div className="l">
            <div className="header--left">
              <a className="header--logo" href="/">
                <img src="static/full-logo-white.png" alt="RUXtest | Dexecure" />
              </a>
            </div>
            <div className="header--middle">
              <label className="switch">
                <input onClick={this.handleToggleClick} defaultChecked type="checkbox" id="togBtn" />
                  <div className="slider round">
                    <span className="on">
                      Compare
                    </span>
                    <span className="off">
                      Test
                    </span>
                  </div>
              </label>
            </div>
            <div className="header--right">
              <a className="btn" href="https://dexecure.com">Try Dexecure</a>
            </div>
          </div>
        </header>
        <div className="svg-background">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 810" preserveAspectRatio="xMinYMin slice" aria-hidden="true"><path fill="#efefee" d="M592.66 0c-15 64.092-30.7 125.285-46.598 183.777C634.056 325.56 748.348 550.932 819.642 809.5h419.672C1184.518 593.727 1083.124 290.064 902.637 0H592.66z" /><path fill="#f6f6f6" d="M545.962 183.777c-53.796 196.576-111.592 361.156-163.49 490.74 11.7 44.494 22.8 89.49 33.1 134.883h404.07c-71.294-258.468-185.586-483.84-273.68-625.623z" /><path fill="#f7f7f7" d="M153.89 0c74.094 180.678 161.088 417.448 228.483 674.517C449.67 506.337 527.063 279.465 592.56 0H153.89z" /><path fill="#fbfbfc" d="M153.89 0H0v809.5h415.57C345.477 500.938 240.884 211.874 153.89 0z" /><path fill="#ebebec" d="M1144.22 501.538c52.596-134.583 101.492-290.964 134.09-463.343 1.2-6.1 2.3-12.298 3.4-18.497 0-.2.1-.4.1-.6 1.1-6.3 2.3-12.7 3.4-19.098H902.536c105.293 169.28 183.688 343.158 241.684 501.638v-.1z" /><path fill="#e1e1e1" d="M1285.31 0c-2.2 12.798-4.5 25.597-6.9 38.195C1321.507 86.39 1379.603 158.98 1440 257.168V0h-154.69z" /><path fill="#e7e7e7" d="M1278.31,38.196C1245.81,209.874 1197.22,365.556 1144.82,499.838L1144.82,503.638C1185.82,615.924 1216.41,720.211 1239.11,809.6L1439.7,810L1439.7,256.768C1379.4,158.78 1321.41,86.288 1278.31,38.195L1278.31,38.196z" /></svg>
        </div>
        <div className="heading">
          <h1>Real User Experience Test (rUXt) - Comparison</h1>
          <h2>Compare among 1,241,019 websites accessed by Google Chrome Users</h2>
        </div>
        <div className="container">
          <div className="DeviceConnection__wrapper">
            <div className="DeviceInput__wrapper">
              <Select
                value={this.state.device}
                onChange={this.handleOnDeviceChange}
                clearable={false}
                options={deviceList}
                searchable={false}
              />
            </div>
            <div className="ConnectionInput__wrapper">
              <Select
                value={this.state.connection}
                onChange={this.handleOnConnectionChange}
                clearable={false}
                searchable={false}
                options={connectionList}
              />
            </div>
          </div>
          <div className="TimeInput__wrapper">
            <span className="TimeInput__label">Time (in seconds):</span>
            <Slider
              min={0}
              max={10}
              value={Number(this.state.time)}
              format={formatsecond}
              tooltip={false}
              handleLabel={this.state.time.toString()}
              onChange={this.handleOnTimeChange}
            />
          </div>
          <div className="URLCompare__wrapper">
            <ResultGraph
              id="1"
              device={this.state.device}
              connection={this.state.connection}
              time={this.state.time}
            />
            <ResultGraph
              id="2"
              device={this.state.device}
              connection={this.state.connection}
              time={this.state.time}
            />
          </div>
          <div className="explanation__wrapper">
            <div className="explanation__row">
              <div className="explanation__item">
                <div className="explanation__header">
                  <span className="explanation__text">
                    How to use the tool
                  </span>
                </div>
                <div className="explanation__section">
                  <span className="explanation__text">
                    - Select a website using the autocomplete.<br />
                    - (Optional) select a device and connection type. <br />
                    - Use the time slider to select the user wait time.
                  </span>
                </div>
              </div>
              <div className="explanation__item">
                <div className="explanation__header">
                  <span className="explanation__text">
                    Assume 1000 website visitors
                  </span>
                </div>
                <div className="explanation__section">
                  <span className="explanation__text">
                    - <Human color="#ffffff" /> : no content loaded,<br />
                    - <Human color="#5486AA" /> : some content loaded,<br />
                    - <Human color="#153B58" /> : document loaded.
                  </span>
                </div>
              </div>
            </div>
            <div className="explanation__header">
              <span className="explanation__text">
                Metrics
              </span>
            </div>
            <div className="explanation__section">
              <span className="explanation__text">
                - <a href="https://dexecure.com/blog/chrome-user-experience-report-explained-google-bigquery/#diving-into-the-important-questions-wheee">Site Experience Benchmark (SEB)</a> score: the fraction of users completing first contentful paint within first second.<br />
                - The percentage of users completing <a href="https://developers.google.com/web/updates/2017/06/user-centric-performance-metrics#first_paint_and_first_contentful_paint">first contentful paint</a> within given time.<br />
                - The percentage of users completing document load within given time.<br />
              </span>
            </div>
            <div className="explanation__header">
              <span className="explanation__text">
                Learn more
              </span>
            </div>
            <div className="explanation__section">
              <span className="explanation__text">
                - Read more on CrUX and the metrics for user experience in <a href="https://dexecure.com/blog/chrome-user-experience-report-explained-google-bigquery/">the introductory article on CrUX</a>.<br />
                - Contribute at <a href="https://github.com/dexecure/ruxt">GitHub</a>. Suggestions welcome.<br />
                - Reach out at <a href="mailto:coffee@dexecure.com">coffee@dexecure.com</a>.
              </span>
            </div>
          </div>
        </div>
        <style jsx>{`
          .URLCompare__wrapper {
            border: 1px solid #ccc;
            overflow: auto;
          }
        `}
        </style>
      </div>
    );
  }
}

export default CompareComponent;
