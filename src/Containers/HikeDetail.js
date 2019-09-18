import React, { useEffect, useState } from 'react';
import { Link } from "@reach/router";

function HikeDetail({ hikeId }) {
    const [hikeDetail, setHikeDetail] = useState([])
    useEffect(() => {
        fetch(`http://localhost:3001/hikes/${hikeId}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(JSON.stringify(data));
                setHikeDetail(data);
            });
    }, [hikeId]);

    return (
        <section>
            <h1 className="text-2xl">{hikeDetail.name}</h1>
            <table>
                <thead>
                    <tr className="font-bold">
                        <th>Name</th>
                        <th>Distance</th>
                        <th>Elevation Change</th>
                        <th>Location</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>{hikeDetail.name}</th>
                        <th>{hikeDetail.distance}</th>
                        <th>{hikeDetail.elevationChange}</th>
                        <th>{hikeDetail.location}</th>
                    </tr>
                </tbody>
            </table>
            <Link to="/hikes" className="underline">Back to List of Hikes</Link>
        </section>
    );
}

export default HikeDetail;
