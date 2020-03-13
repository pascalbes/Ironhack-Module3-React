import React, {useState, useEffect} from 'react'

const Temperature = () => {

    const [temperature, setTemperature] = useState()

    function handleTemperature(e) {
        setTemperature(e.target.value)
    }

    function handleTemperatureText() {
        if (temperature < 10) {
            return "It's cold ❄️"
        }
        else if (temperature >= 10 && temperature <= 30) {
            return "It's nice 🌼"
        }
        else if (temperature > 30) {
            return "It's warm ☀️"
        }
    }

    return (


        <div>
            <h1>Temperature</h1>
            <input type="number" placeholder="Temperature in °C" onChange={(e) => handleTemperature(e)}></input>
            <p>{handleTemperatureText()}</p>
        </div>
    )
}

export default Temperature
