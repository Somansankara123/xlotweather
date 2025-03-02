import React, { useEffect, useState } from 'react'

const Weather = () => {
    const [city, setCity] = useState("")
    const[value,setValue]=useState("")
   const [favouriteCity, setFavouriteCity] = useState("")
    const [temperature, setTemperature] = useState(null)
    const [description, setDescription] = useState("")
    const [icon, setIcon] = useState("")
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY
    const getWeather = async (storedFavourite) => {
        const cityTofetch=storedFavourite||city
        if(!cityTofetch) return
        setLoading(true)
        setError(false)

        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityTofetch}&appid=${apiKey}&units=metric`)
            const data = await response.json()

            if (response.ok) {
                setTemperature(data.main.temp)
                setValue(data.name)
                setDescription(data.weather[0].description)
                const iconCode = data.weather[0].icon
                setIcon(`https://openweathermap.org/img/wn/${iconCode}@2x.png`)
            } else {
                setError(true)
            }
        } catch (err) {
            setError(true)
        } finally {
            setLoading(false)
        }
    }
    const saveFavouriteCity=()=>{
        localStorage.setItem("favouriteCity",city)
        setFavouriteCity(city)
    }

    useEffect(() => {
        const storedFavourite = localStorage.getItem("favouriteCity")
        if (storedFavourite) {
            setFavouriteCity(storedFavourite)
            getWeather(storedFavourite)
        }

        
        
    }, [])

    return (
        <div className='w-full max-w-md p-14  bg-blue-500 rounded-lg text-white m-auto  mt-10  '>
            <div className='flex gap-2 mb-4'>
                <input
                    className='input input-bordered w-full text-gray-900 text-center bg-white'
                    placeholder="Enter city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <button className='btn btn-success' onClick={()=>getWeather(city)}>Search</button>
            </div>

            {loading ? (
                <div className='flex justify-center'>
                    <img src="/spinner.svg" alt="Loading..." className='w-12 h-12' />
                </div>
            ) : (
                
                   ! error &&(
                <div className='bg-white rounded shadow p-4 text-gray-800'>
                    <div className='flex '>
                        {value &&
                        <p className='font-bold text-xl capitalize text-red-500 mx-7'> City:{value}</p>}
                        {temperature !== null && <p className='text-green-500 font-semibold p-1  mx-6'>Temp:{temperature}°C</p>}
                    </div>
                    <div className='flex items-center justify-center gap-3 mt-2'>
                        <p className='capitalize text-violet-600'>{description}</p>
                        {icon && <img src={icon} alt="Weather Icon" />}
                    </div>
                    <button
                            className='btn btn-outline btn-sm mt-4'
                            onClick={saveFavouriteCity}
                        >
                            Save as Favourite
                        </button>
                        {favouriteCity && <p className="mt-2 text-sm text-yellow-300">Favourite City: {favouriteCity}</p>}
                </div>
                        )
                        
            )}

            {error && <p className='text-red-500 mt-3'>Enter valid city name.</p>}
        </div>
    )
}

export default Weather
