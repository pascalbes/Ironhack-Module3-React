import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
// custom tools
import LabPreview from "../LabPreview";
// styles
import "./../../styles/form.css";
import api from "../../api/APIHandler"




class FormArtist extends Component {

  state = {
    styles: [],
    name: "",
    description: "",
    isBand: false,
    styleId: ""
  };

  componentDidMount() {

    const title = this.props.match.params.mode + this.props.match.params.endpoint

    this.setState({title: title})

    api.get("/styles")
    .then(dbStyles => {
      if(this.props.match.params.id) {
        api.get("/artists/"+this.props.match.params.id)
        .then(artist => {
          this.setState({
            styles: dbStyles.data.styles,
            name: artist.data.artist[0].name,
            description: artist.data.artist[0].description,
            isBand: artist.data.artist[0].isBand,
            styleId: artist.data.artist[0].style
          })
        })
        .catch(err => console.log(err))
      }
      else {
        this.setState({styles: dbStyles.data.styles})
      }
    })
    .catch(err => console.log(err))

  }

  handleCreateArtist = event => {
    event.preventDefault()
    const name=event.target[0].value
    const description=event.target[1].value
    const style = event.target[2].value
    const isBand = event.target[3].checked
    const newArtist = {name, description, style, isBand}
    console.log(newArtist)
    if (this.props.match.params.id) {
      console.log("/artists/"+this.props.match.params.id)
      api.patch("/artists/"+this.props.match.params.id, newArtist)
      .then(artistUpdated => alert("Artist Updated", artistUpdated.data))
      .catch(err=>console.log(err))
    }
    else {
      api.post("/artists", newArtist)
      .then(response => alert("Artist Created", response.data))
      .catch(err=>console.log(err))
    }
  }

  handleIsBand = type => {
    if (type=="yes" ) {
      return this.state.isBand ? <input type="radio" name="isBand" checked/> : <input type="radio" name="isBand"/>
    }
    else {
      return this.state.isBand ? <input type="radio" name="isBand" /> : <input type="radio" name="isBand" checked/>
    }
  }

  handleDefaultStyle = (index, id, name) => {

    if (id == this.state.styleId) {
      return <option value={id} key={index} selected>{name}</option>
    }
    else {
      return <option value={id} key={index}>{name} </option> 
    }

  }
  

  render() {

    return (
      <>

        <form onSubmit={this.handleCreateArtist}>

          <div>
            <label>Name</label>
            <input name="name" type="text" placeholder="Artist name" defaultValue={this.state.name}></input>
          </div>

          <div>
            <label>Description</label>
            <input name="description" type="text" placeholder="Description" defaultValue={this.state.description}></input>
          </div>

          <div>
            <label>Style</label>

            <select name="description">
            {this.state.styles.length && this.state.styles.map((style, i) => {
              return this.handleDefaultStyle(i, style._id, style.name)
            })}
            </select>
          </div>


          <label>Is band</label>
          <div>
            <div>
              {this.handleIsBand("yes")}
              <label>Yes</label>
            </div>

            <div>
            {this.handleIsBand("no")}
              <label>No</label>
            </div>
          </div>
          

          <button type="submit">OK</button>

        </form>

      </>
    )
  }
}

export default withRouter(FormArtist);
