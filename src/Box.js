import React, { Component } from 'react'

/** A single box in the box list
 * This has no state. Props background color, width, height, remove fn passed down from BoxList.
 * When each box component is displayed, add a button with text "X".
 * When user clicks button, remove the box.
 */

class Box extends Component {
  constructor(props) {
    super(props);
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleRemove() {
    //call up the BoxList to remove box when user clicks button
    // console.log("handleRemove this.props", this.props)
    this.props.remove(this.props.id);
  }

  render() {
    const { backgroundColor, height, width } = this.props;

    return (
      <div>
        <div
          style={ {
            backgroundColor: backgroundColor,
            height: `${height}em`,
            width: `${width}em`
          } }
        />
        <button className="button"
          onClick={this.handleRemove}>X
        </button>
      </div>
    );
  }
}

export default Box;
