import React from 'react';

class VoteCount extends React.Component {
  render() {
    return (
      <div>{this.props.voteCount}</div>
    );
  }
}

export default VoteCount;