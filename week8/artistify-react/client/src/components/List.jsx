import React from "react";
import {
  BrowserRouter as Router,
  Link
} from 'react-router-dom';
import DefaultArtistView from "../components/DefaultArtistView"

export default function List({ route, data, cssList = "list generic", cssItem = "item", Component }) {

  if (!data) return <p>Error : Component List expects an iterable "data" props</p>;

  return (
    <ul className={cssList}>
      {Boolean(data.length) ? data.map((d, i) => (
        <Link to={route + d._id}>
        <li key={i} className={cssItem}>
          {Component && <Component data={d} />}
          {!Component && d}
        </li>
        </Link>
      )) : <DefaultArtistView />}
    </ul>
  );
}
