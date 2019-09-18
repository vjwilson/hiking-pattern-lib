import React, { useEffect, useState } from 'react';
import { Link } from "@reach/router";
import { ExternalLink } from 'react-feather';

function Hikes() {
    const [hikes, setHikes] = useState([])
    useEffect(() => {
        fetch('http://localhost:3001/hikes')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(JSON.stringify(data));
                setHikes(data);
            });
    }, []);

    const rows = hikes.map(hike => {
        return (
            <tr key={hike.name}>
                <td class="py-4 px-6 border-b border-grey-light">{hike.name}</td>
                <td class="py-4 px-6 border-b border-grey-light">{hike.distance} miles</td>
                <td class="py-4 px-6 border-b border-grey-light">{hike.elevationChange} feet</td>
                <td class="py-4 px-6 border-b border-grey-light">{hike.location}</td>
                <td class="py-4 px-6 border-b border-grey-light flex">
                    <Link to={`/hikes/${hike.id}`} className="underline mr-2">View Details</Link>

                    <a className="underline ml-2" href={hike.wikipedia} rel="noopener noreferrer" target="_blank">
                        <span className="flex items-center"><span className="mr-1">Wikipedia</span><ExternalLink size={12} /></span>
                    </a>
                </td>
            </tr>
        )
    });

    return (
        <section className="">
            <h1 className="text-2xl">Hikes</h1>
            <div class="bg-white shadow-md rounded my-6 w-full">
                <table className="text-left table-auto w-full">
                    <thead>
                        <tr className="font-bold">
                            <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Name</th>
                            <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Distance</th>
                            <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Elevation Change</th>
                            <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Location</th>
                            <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default Hikes;
