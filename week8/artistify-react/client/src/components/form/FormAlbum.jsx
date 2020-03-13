import React, { Component } from "react";
import { withRouter } from "react-router-dom";
// custom tools
// import CustomInputFile from "./../icon/IconAvatarAdmin";
import LabPreview from "../LabPreview";
// styles
import "./../../styles/form.css";
import "./../../styles/icon-avatar.css";
import api from "../../api/APIHandler"


class FormAlbum extends Component {

  state = {
    artists: [],
    labels: [],
    file: "",
    imageOriginal: "",
    tmpCover: "",
    title: "",
    releaseDate: "",
    description:"",
    artistId:"",
    labelId:""

  };

  componentDidMount() {

    api.get("/artists")
    .then(dbArtists => {
      api.get("/labels")
      .then(dbLabels => {        
        if (this.props.match.params.id) {
          api.get("/albums/"+this.props.match.params.id)
          .then(dbAlbum => {
            this.setState({
              tmpCover: dbAlbum.data.album[0].cover,
              imageOriginal: dbAlbum.data.album[0].cover,
              labelId: dbAlbum.data.album[0].label,
              artistId: dbAlbum.data.album[0].artist,
              labels: dbLabels.data.labels,
              artists: dbArtists.data.artists,
              title: dbAlbum.data.album[0].title,
              description: dbAlbum.data.album[0].description,
              releaseDate: dbAlbum.data.album[0].releaseDate.substr(0,10),
              //styleId: artist.data.artist[0].style
            })
          })
        .catch(err => console.log(err))
        }
        else {
          this.setState({labels: dbLabels.data.labels, artists: dbArtists.data.artists})
        }
        
      })
      .catch(err => console.log(err))
    })
    .catch(err => console.log(err))

  }

  fileHandler = event => {

    this.setState({ file: event.target.files[0] }, () => {
      const reader = new FileReader();
      reader.onloadend = () => {
        // when the fileREader ends  ...
        const baseString = reader.result; // get the image as a base64 encoded string
        this.setState({ tmpCover: baseString }); // set the tmp avatar as an image source before upload
      };
      reader.readAsDataURL(this.state.file); // read the file from the local disk
    });
  }

  handleCreateAlbum = event => {
    event.preventDefault()

    var fd = new FormData()
    fd.append("title",event.target[0].value)
    fd.append("releaseDate",event.target[1].value)
    fd.append("imageOriginal",event.target[3].value)
    fd.append("description",event.target[4].value)
    fd.append("artist",event.target[5].value)
    fd.append("label",event.target[6].value)
    fd.append("cover",this.state.file)

    if (this.props.match.params.id) {
      api.patch("/albums/"+this.props.match.params.id, fd)
      .then(albumUpdated => alert("album updated", albumUpdated))
      .catch(err => console.log(err))
    }
    else {
      api.post("/albums", fd)
      .then(albumCreated => alert("album created", albumCreated))
      .catch(err => console.log(err))
    }
  }

  handleDefaultArtistAndLabel = (index, id, name) =>{
    if (id == this.state.artistId) {
      return <option value={id} key={index} selected>{name}</option>
    }
    else {
      return <option value={id} key={index}>{name} </option> 
    }
  }

  handleImageText = () => {
    if (this.props.match.params.id) {
      return "Change Image"
    }
    else {
      return "Add image"
    }
  }


  render() {
    return (
      <>      

        <form onSubmit={this.handleCreateAlbum} enctype="multipart/form-data">

          <div>
            <label>Title</label>
            <input name="title" type="text" placeholder="Album name" defaultValue={this.state.title}></input>
          </div>

          <div>
            <label>Release Date</label>
            <input name="releaseDate" type="date" defaultValue={this.state.releaseDate}></input>
          </div>

          <div>
            <label>{this.handleImageText()}</label>
            <input name="cover" type="file" onChange={this.fileHandler}></input>
          </div>

          <div>
            <label>Cover</label>
            <img src={this.state.tmpCover} id="imageCover" type="file"/>
          </div>

          {this.state.imageOriginal &&
          <div class="is-hidden">
            <input class="input" name="imageOriginal" type="text" value={this.state.imageOriginal}/>
          </div>}

          <div>
            <label>Description</label>
            <input name="description" type="text" placeholder="Description" defaultValue={this.state.description}></input>
          </div>

          <div>
            <label>Artist</label>

            <select name="artist">
            {this.state.artists.length && this.state.artists.map((artist, i) => {
              return this.handleDefaultArtistAndLabel(i,artist._id, artist.name)
            })}
            </select>
          </div>

          <div>
            <label>Label</label>

            <select name="label">
            {this.state.labels.length && this.state.labels.map((label, i) => {
              return this.handleDefaultArtistAndLabel(i,label._id, label.name)
            })}
            </select>
          </div>

      
          

          <button type="submit">OK</button>

        </form>

      </>
    );
  }
}

export default withRouter(FormAlbum);

