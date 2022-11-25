// Types
import { MarkerType , WeatherType} from './App'

const PLACE_RADIUS = 2500; // 2500 meters

const TYPE = 'bar';

export const fetchNearbyPlaces = async (lat: number, lng: number): Promise<MarkerType[]> => {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_API_KEY!,
            'X-RapidAPI-Host': 'trueway-places.p.rapidapi.com'
        }
    };
    const response = await fetch(`https://trueway-places.p.rapidapi.com/FindPlacesNearby?location=${lat}%2C${lng}&type=${TYPE}&radius=${PLACE_RADIUS}&language=en`, options);

    if (!response.ok){
        throw new Error('Oh no! Something messed up!');
    }

    const data = await response.json();
    return data.results;

}

export const fetchWeather = async (marker: MarkerType): Promise<WeatherType> =>{
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_API_KEY!,
            'X-RapidAPI-Host': 'yahoo-weather5.p.rapidapi.com'
        }
    };
    
   const response = await fetch(
    `https://yahoo-weather5.p.rapidapi.com/weather?lat=${marker.location.lat}&long=${marker.location.lng}&format=json&u=f`, options)

    if (!response.ok){
        throw new Error('Oh no! Something messed up!');
    }

    const data = await response.json();
    return {
        temp: data.current_observation.condition.temperature,
        text: data.current_observation.condition.text
    }

}