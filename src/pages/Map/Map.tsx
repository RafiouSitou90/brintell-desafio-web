import { LatLng } from 'leaflet'
import { TileLayer, Marker, Popup, MapContainer } from 'react-leaflet'

import { mapIcon } from '../../utils'
import { useTitle } from '../../hooks'

const data = [
    {
        id: 1,
        latitude: -15.7791578,
        longitude: -47.8862542,
        name: 'Memorial JK'
    },
    {
        id: 2,
        latitude: -15.864792,
        longitude: -47.9136771,
        name: 'Aéroport international Presidente Juscelino Kubitschek'
    },
    {
        id: 3,
        latitude: -15.8539969,
        longitude: -47.9443615,
        name: 'Zoológico de Brasília'
    }
]

const Map = () => {
    useTitle('Map | Brintell Desafio')

    const position = new LatLng(-15.8310022, -47.926478)

    return (
        <div className="container">
            <h1>Map</h1>

            <div className="my-5 w-100 h-100">
                <MapContainer center={position} zoom={13} scrollWheelZoom={true}>
                    <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                    {data.map(({ id, name, latitude, longitude }, index) => {
                        const position = new LatLng(latitude, longitude)

                        return (
                            <Marker key={index} position={position} icon={mapIcon}>
                                <Popup closeButton={true} minWidth={240} maxWidth={240} className="map-popup" autoClose={true}>
                                    {name}
                                </Popup>
                            </Marker>
                        )
                    })}

                    <Marker position={position} icon={mapIcon}>
                        <Popup className="map-popup" autoClose={true}>
                            Brintell
                        </Popup>
                    </Marker>
                </MapContainer>
            </div>
        </div>
    )
}

export default Map
