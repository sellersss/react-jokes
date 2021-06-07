import React from 'react';

class VoteButton extends React.Component {
  constructor(props) {
    super(props)
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(evt) {
    evt.preventDefault()
    this.props.action(this.props.value, this.props.idx)
  }

  render() {
    return (
      <button onClick={this.clickHandler}>{this.props.icon}</button>
    );
  }
}

export default VoteButton;
