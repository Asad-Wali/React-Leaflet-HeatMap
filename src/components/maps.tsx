import { Rectangle, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import data from '../coordinates.json';
import './map.css'

const RectangleList = () => {
    let map = useMap();

    // Assign unique color to each layer
    const RgbaColor = (index: any) => {
        let h = (1.0 - index) * 240
        return "hsl(" + h + ", 100%, 50%)";
    }


    return (
        // draw Ractangle of each coordinate
        <span>
             {/* We Assuming that our Coordinate are in sorted */}
            {data.map((item, i) => {
                let northEast = item.northEast.split(',');
                let southWest = item.southWest.split(',');
                let lagx = Number(northEast[0]);
                let lagy = Number(northEast[1]);
                let latx = Number(southWest[0]);
                let laty = Number(southWest[1]);
                return <Rectangle key={i} bounds={[[lagx, lagy], [latx, laty]]} weight={0} color={RgbaColor(i)}
                // handling events
                    eventHandlers={({
                        // on click open the seleted view in full screen mod
                        click: () => {
                            map.setView(
                                [
                                    // this will set the center of the rectangular area
                                    (lagx + latx) / 2,
                                    (lagy + laty) / 2
                                ],
                                14
                            );
                        },
                                // on mouse hover it gives the weight and color to selected area
                                mouseover(e) {
                                    e.target.setStyle({
                                        weight: 2,
                                        color: RgbaColor(i)
                                    });
                                },
                                // on mouse out it will reset the weight to 0
                                mouseout(e) {
                                    e.target.setStyle({
                                        weight: 0
                                    });
                                }
                            })
                            }
                        />
            })}
        </span>
    );
};

export default RectangleList;