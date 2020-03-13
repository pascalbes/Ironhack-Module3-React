import React, { useContext, useEffect, useState } from "react";
// custom tools
import apiHandler from "../api/APIHandler";
// import CardAlbum from "../components/card/CardAlbum";
// import Comments from "../components/comment/Comments";
// import List from "../components/List";
// import Stars from "../components/star/Stars";
import UserContext from "./../auth/UserContext";
import LabPreview from "../components/LabPreview";
// styles
import "./../styles/artist.css";
import "./../styles/comment.css";
import "./../styles/star.css";

export default function Artists({ match }) {

  const [artist, setArtist] = useState({})
  const [albums, setAlbums] = useState([])

  const userContext = useContext(UserContext);
  const { currentUser } = userContext;

  useEffect(() => {
    apiHandler.get("/artists/"+match.params.id)
    .then(dbRes => {
      setArtist(dbRes.data.artist[0])

      apiHandler.get("/albumsbyartist/"+match.params.id)
      .then(dbRes => {
        setAlbums(dbRes.data.albums)
      })
    })
    .catch(err => console.log(err))
  }, [])

  
  


  return (
    <>

      <div>
        <h1>{artist.name}</h1>
        <hr></hr>
        <p>{artist.description}</p>
      </div>

      <br/><br/><br/><br/><br/><br/><br/>

      <div>
        <h1>Discography</h1>
        <hr></hr>
        <ul>
        {albums.map( (album, i) => (
          <li key={i}> 
            <h2>{album.title}</h2>
            <img src={album.cover}></img>
          </li>
        ))}
        </ul>
      </div>



     
    </>
  );
}
