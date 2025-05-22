'use-client';

// import modules and functions from external libraries
import { Libraries, useJsApiLoader } from '@react-google-maps/api';
import { ReactNode } from 'react';

// define a list of libraries to load from the Google Maps API
const libraries = ['places', 'drawing','geometry'];

// declare a function component called MapProvider that takes a children prop
export function MapProvider({children}: {children: ReactNode}) {
    // load the google maps javascript api async
    const {isLoaded: scriptLoaded, loadError} = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
        libraries: libraries as Libraries,
    });

    if(loadError) {
        return <div>Error loading Google Maps API</div>;
    }

    if(!scriptLoaded) {
        return <div>Loading...</div>;
    }

    // return the children prop wrapped by this MapProvider component
    return children;
}
