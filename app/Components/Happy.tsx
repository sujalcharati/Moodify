
import React from 'react';

export const getAPI = async () => {
    try {
        const req = await fetch('https://api.spotify.com/v1/playlists/3cEYpjA9oz9GiPac4AsH4n');
        const ans =req.json();
        console.log(ans);
    } catch (e) {
        console.log('there is error in api handling');
    }
};

export const Happy: React.FC = () => {
    return (
        <div>
            it's happy page
        </div>
    );
}
