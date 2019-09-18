import React, { useEffect, useState } from 'react';
import { Camera } from 'react-feather';
import {FlexibleWidthXYPlot,
    XAxis,
    YAxis,
    HorizontalGridLines,
    HorizontalBarSeries,
    VerticalGridLines,
    VerticalBarSeries
} from 'react-vis';

function Home() {
    const [hikes, setHikes] = useState([])
    useEffect(() => {
        fetch('http://localhost:3001/hikes')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setHikes(data);
            });
    }, []);

    const featuredHike = hikes[0] || {};

    const hikesSortedByDistance = hikes.sort((a, b) => {
        return a.distance - b.distance;
    })
    const topLongestHikes = hikesSortedByDistance.slice(0, 5);
    const minHikeLength = Math.min(...topLongestHikes.map(d => d.distance));
    const maxHikeLength = Math.max(...topLongestHikes.map(d => d.distance));
    const hikeLengthDomain = [0.9 * minHikeLength, 1.1 * maxHikeLength];

    const hikesSortedByAltitude = hikes.sort((a, b) => {
        return a.elevationChange - b.elevationChange;
    })
    const topAltitudeHikes = hikesSortedByAltitude.sort((a, b) => {
        return b.elevationChange - a.elevationChange;
    }).slice(0, 5);
    const minHikeAltitude = Math.min(...topLongestHikes.map(d => d.elevationChange));
    const maxHikeAltitude = Math.max(...topLongestHikes.map(d => d.elevationChange));
    const hikeAltitudeDomain = [0.9 * minHikeAltitude, 1.1 * maxHikeAltitude];

    return (
        <div className="mb-8">
            <h1 className="text-2xl">Home</h1>
            <div className="flex flex-col w-full">
                <div className="flex w-full bg-white shadow-xl rounded-lg overflow-hidden mb-8">
                    <img src={featuredHike.mainImage} alt={`${featuredHike.name}`} />
                    <div className="md:ml-4">
                        <h2 className="flex flex-col">
                            <span className="text-xl">Featured Hike:</span>
                            <span className="text-2xl">{featuredHike.name}<Camera /></span>
                        </h2>
                        <article>
                            <p>Daniel Ridge is a 4.1 mile loop trail located near Brevard, North Carolina. The trail is rated as moderate and is primarily used for hiking and mountain biking. Dogs are also able to use this trail but must be kept on leash.</p>
                        </article>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row -mx-8">
                    <div className="flex flex-col w-full bg-white shadow-xl rounded-lg overflow-hidden mx-8">
                        <header className="bg-green-400 p-2">
                            <h2>Longest Hikes</h2>
                        </header>
                        <div>
                            <FlexibleWidthXYPlot
                                height={450}
                                yType="ordinal"
                                getX={d => d.distance}
                                getY={d => d.name}
                                xDomain={hikeLengthDomain}
                                margin = {{ left: 120, right: 10, top: 10, bottom: 40 }}
                            >
                                <VerticalGridLines />
                                {topLongestHikes.length > 0 && (
                                <HorizontalBarSeries
                                    color="forestgreen"
                                    data={topLongestHikes}
                                />)}
                                <XAxis
                                    title="Miles"
                                />
                                <YAxis />
                            </FlexibleWidthXYPlot>
                        </div>
                    </div>
                    <div className="flex flex-col w-full bg-white shadow-xl rounded-lg overflow-hidden mx-8">
                        <header className="bg-green-400 p-2">
                            <h2>Hikes with the Most Altitude Change</h2>
                        </header>
                        <div>
                            <FlexibleWidthXYPlot
                                height={450}
                                xType="ordinal"
                                getX={d => d.name}
                                getY={d => d.elevationChange}
                                yDomain={hikeAltitudeDomain}
                                margin = {{ left: 120, right: 10, top: 10, bottom: 40 }}
                            >
                                <HorizontalGridLines />
                                {topLongestHikes.length > 0 && (
                                <VerticalBarSeries
                                    color="forestgreen"
                                    data={topAltitudeHikes}
                                />)}
                                <XAxis />
                                <YAxis
                                    title="Feet"
                                />
                            </FlexibleWidthXYPlot>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
