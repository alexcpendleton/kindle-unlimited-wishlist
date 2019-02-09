import React, { Component } from "react";
import "./App.css";
import WishlistQuerier from "./WishlistQuerier";

class App extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      itemsYes: [],
      itemsNo: [],
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
        <Results items={this.state.itemsYes} header="Yep! :)" />
        <Results items={this.state.itemsNo} header="Nope! :(" />
      </div>
    );
  }
  handleIdChange(event) {
    console.log("handleIdChange: ", event.target.value);
    this.setState({
      wishlistId: event.target.value
    });
  }
  handleSubmit() {
    this.setState({
      goButtonDisabled: true,
      status: "Searching...",
      items: []
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
      status: stuff.hasKindleUnlimited ? "Yep" : "Nope",
      id: stuff.id
    });
    if (newItem.hasKindleUnlimited) {
      this.setState(state => ({
        itemsYes: [newItem].concat(state.itemsYes)
      }));
    } else {
      this.setState(state => ({
        itemsNo: [newItem].concat(state.itemsNo)
      }));
    }
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
    if (!this.props.items || !this.props.items.length) return "";
    return (
      <div>
        <h2>{this.props.header}</h2>
        <ul>
          {this.props.items.map(i => (
            <li key={i.id}>
              <a href={i.uri}>{i.name}</a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
function ResultItem(options) {
  return Object.assign(
    {},
    {
      id: 0,
      status: "Pending"
    },
    options
  );
}
export default App;
