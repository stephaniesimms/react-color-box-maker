import React, { Component } from 'react'
import Box from "./Box"
import NewBoxForm from "./NewBoxForm"

class BoxList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      boxes: []
    };
    this.addBox = this.addBox.bind(this);

    // forgot to bind this.remove and got type error when clicking button
    this.remove = this.remove.bind(this);
  }

  // add newly submitted box info to boxes array from makeBox
  addBox(boxObj) {
    this.setState(st => ({
      boxes: [...st.boxes, boxObj]
    }));
  }

  // need to use a cb (above) because this.state depends on previous state 
  // this.setState({
  //   boxes: [...this.state.boxes, boxObj]
  // });

  remove(id) {
    // console.log("remove this=", this);
    this.setState({
      boxes: this.state.boxes.filter(box => box.id !== id)
    }, () => console.log("remove state changed: ", this.state));
  }

  render() {
    // console.log("this.state.boxes to render", this.state.boxes)
    
    // fancy style to destructure obj
    const boxes = this.state.boxes.map(
      ({ id, backgroundColor, width, height }) => (
        <Box
          key={id}
          id={id}
          backgroundColor={backgroundColor}
          width={width}
          height={height}
          remove={this.remove}
        />
      ))
  
    // let boxes = this.state.boxes.map(box => (
    //   <Box
    //     key={box.id}
    //     id={box.id}
    //     backgroundColor={box.backgroundColor}
    //     width={box.width}
    //     height={box.height}
    //     remove={this.remove}
    //   />
    // ))

    return (
      <div>
        <NewBoxForm makeBox={this.addBox} />
        {boxes}
      </div>
    )
  }
}


export default BoxList;