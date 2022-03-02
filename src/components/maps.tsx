import { Rectangle, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import data from '../coordinates.json';

const RectangleList = () => {
    // Assign unique color to each layer
    const RgbaColor = (index: any) => {
        var letters: string
        if (data.length / 2 < index) {
            letters = '01234567';
        }
        else {
            letters = '89ABCDEF';
        }
        var color: string = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 7)];
        }
        return color;
    }

    const map = useMap()
    return (
        // draw Ractangle of each coordinate
        <span>
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
                                    (lagx + latx) / 2,
                                    (lagy + laty) / 2
                                ],
                                15
                            );
                        },
                        // on mouse hover it gives the weight and color to selected area
                        mouseover(e) {
                            e.target.setStyle({
                                weight:1,
                                color: RgbaColor(i)
                            });
                        },
                        // on mouse out it reset the weight to 0
                        mouseout(e) {
                            e.target.setStyle({
                                weight:0
                            });
                        }
                    })
                    }
                />;
            })}
        </span>
    );
};

export default RectangleList;