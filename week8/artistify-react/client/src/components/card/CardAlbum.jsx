import React from "react";
import { Link } from "react-router-dom";
// custom tools
import IconFav from "../icon/IconFavorite";
// styles
import "./../../styles/icon-color.css";

export default function CardArtist({ data }) {

  function handleColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }


  return (
    <div>
        <div style={{backgroundColor: `${handleColor()}`}} class="icon-color"></div>
        <div>{data.title}</div>
        <div>
          <img src={data.cover} />
        </div>
    </div>
  
  );
}
