import React, {useState, useEffect} from 'react'

const CustomizeImage = () => {


    const [size, setSize] = useState()
    const [url, setUrl] = useState()

    function handleTextDisplayed() {
        return size ? size + " x " + size : ""
    }

    function handleUrl(e) {
        setUrl(e.target.value)
    }

    function handleSize(e) {
        setSize(e.target.value)
    }

    return (

        <div>
            <h1>Customize Image</h1>

            <div>
                <input type="text" onChange={e => handleUrl(e)}></input>
                <br></br> 
                <input type="range" min="0" max="200" onChange={e => handleSize(e)}></input>
                <p>{handleTextDisplayed()}</p>
                <img src={url} width={size}></img>
            </div>
            
        </div>
    )
}

export default CustomizeImage
