import React, { useContext, useEffect, useState } from "react";
// custom tools
// import apiHandler from "../api/APIHandler";
import UserContext from "../auth/UserContext";
// import Comments from "../components/comment/Comments";
// import FormatDate from "../components/FormatDate";
// import Stars from "../components/star/Stars";
import LabPreview from "../components/LabPreview";
import apiHandler from "../api/APIHandler";
// styles
import "../styles/album.css";
import "../styles/comment.css";
import "../styles/star.css";

export default function Album({ match }) {
  
  const [album, setAlbum] = useState({})
  const [style, setStyle] = useState("")

  const userContext = useContext(UserContext);
  const { currentUser } = userContext;

  useEffect(() => {
    apiHandler.get("/albums/"+match.params.id)
    .then(dbRes => {
      var artistId = dbRes.data.album[0].artist
      setAlbum(dbRes.data.album[0])
      apiHandler.get("/artists/"+artistId)
      .then(dbRes => {
        var styleId = dbRes.data.artist[0].style
        apiHandler.get("/styles/"+styleId)
        .then(dbRes => {
          console.log(dbRes)
          setStyle(dbRes.data.name)
        })
        .catch(err=>console.log(err))
      })
      .catch(err=>console.log(err))
    })
    .catch(err => console.log(err))
  }, [])

  return (
    <>
    <h1>{album.title}</h1>
    <img src={album.cover}/>
    <p>{style}</p>

    </>
  );
}
