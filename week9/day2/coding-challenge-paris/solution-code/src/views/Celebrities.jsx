import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Celebrities = () => {

    const [celebs, setCelebs] = useState([])
    const [celebsAll, setCelebsAll] = useState([])
    const [celeb, setCeleb] = useState({})
    
    const apiKey = "b4a6ff971ff22ef4cc07b179e8553101"
    const request = "https://api.themoviedb.org/3/person/popular?page=1&api_key="
    const request2 = "https://api.themoviedb.org/3/person/popular?page="

    useEffect(() => {
        async function fetchDatas() {

            var celebsFetched=[]

            for(let i=1;i<=40;i++) {
                await axios.get(request2 + i + "&api_key=" + apiKey)
                .then(res => {
                    celebsFetched.push(...res.data.results)
                })
                .catch(err => console.log(err))
            }

            setCelebs(celebsFetched)
            setCelebsAll(celebsFetched)

        }

        fetchDatas()
        
    },[])

    function handleClick(celeb) {
        console.log(celeb)
        setCeleb({
            name: celeb.name,
            image: "https://image.tmdb.org/t/p/w185"+ celeb.profile_path,
            knownFor : celeb.known_for
        })
    }

    function handleSearch(e) {
        var celebsSearched=[]
        for (let i=0; i<celebsAll.length;i++) {
            if (celebsAll[i].name.indexOf(e.target.value)>-1) {
                celebsSearched.push(celebsAll[i])
            }
        }
        setCelebs(celebsSearched)
    }

    
    return (
        <div>
            {celebs.length ? (
            <div>
                <h1>Celebrities</h1>
                <p>Look for a celebrity</p>
                <input type="text" placeholder="Celebrity name" onChange={e => handleSearch(e)}></input>
                <div id="celebrities">
                    <div id="popular-celebrities">
                        <h2>{celebs.length} Popular Celebrities</h2>
                        {celebs.map((celeb,i) => (
                            <div key={i} className="celebrities-item">
                                <img src={"https://image.tmdb.org/t/p/w185"+ celeb.profile_path} onClick={() => handleClick(celeb)}></img>
                                <p>{celeb.name}</p>
                            </div>
                        ))}
                    </div>
                    <div id="selected-celebrity">
                        <h2>{celeb.name}</h2>
                        <img src={celeb.image}></img>
                        <h3>{celeb.knownFor && "Known For"}</h3>
                        {celeb.knownFor && celeb.knownFor.map((movie,i) => (
                            <div key={i} className="celebrity-movies">
                                <img src={"https://image.tmdb.org/t/p/w185"+movie.poster_path}></img>
                                <p>{movie.title}{movie.original_name}</p>

                            </div>
                        ))}

                    </div>
                </div>
            </div> )
            :
            (<h1>Fetching datas</h1>)}
        </div>
        
    )
}

export default Celebrities
