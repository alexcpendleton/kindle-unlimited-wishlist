import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import WishlistQuerier from "./WishlistQuerier";

class App extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      items: [],
      wishlistId: "11A3M56RENLVO",
      goButtonDisabled: false,
      status: ""
    };
    this.querier = new WishlistQuerier();
    this.handleIdChange = this.handleIdChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onItemQueried = this.onItemQueried.bind(this);
    this.onFinished = this.onFinished.bind(this);
  }
  render() {
    return (
      <div className="App">
        <form>
          <label>
            Wishlist ID{" "}
            <input
              type="text"
              onChange={this.handleIdChange}
              value={this.state.wishlistId}
            />
          </label>
          <button
            type="button"
            onClick={this.handleSubmit}
            disabled={this.state.goButtonDisabled}
          >
            Go!
          </button>
        </form>
        <p>{this.state.status}</p>
        <Results items={this.state.items} />
      </div>
    );
  }
  handleIdChange(event) {
    console.log("handleIdChange: ", event.value);
    this.setState({
      wishlistId: event.value
    });
  }
  handleSubmit() {
    this.setState({
      goButtonDisabled: true,
      status: "Searching..."
    });
    this.querier.start({
      wishlistId: this.state.wishlistId,
      onItemQueried: this.onItemQueried,
      onFinished: this.onFinished
    });
  }
  onItemQueried(item) {
    const stuff = item;
    const newItem = new ResultItem({
      ...stuff,
      status: stuff.hasKindleUnlimted ? "Yep" : "Nope",
      asin: stuff.asin
    });
    console.log("onItemQueried", newItem);
    this.setState(state => {
      return { items: [newItem].concat(state.items) };
    });
  }
  onFinished() {
    this.setState({
      goButtonDisabled: false,
      status: "All done!"
    });
  }
}
class Results extends Component {
  constructor(props, context) {
    super(props);
  }
  render() {
    return (
      <ul>
        {this.props.items.map(i => (
          <li key={i.asin}>
            {i.name} - {i.status} - <a href={i.uri}>{i.uri}</a>
          </li>
        ))}
      </ul>
    );
  }
}
function ResultItem(options) {
  return Object.assign(
    {},
    {
      asin: 0,
      status: "Pending"
    },
    options
  );
}
export default App;
