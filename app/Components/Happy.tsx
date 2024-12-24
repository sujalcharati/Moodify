"use client"
import dotenv from "dotenv";
dotenv.config();
import React, { useState } from 'react';
const client_id= "";
const client_secret ="";


export const getAPI = async () => {
    try {
        console.log('access to api calling ...');
        const req = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            },
            body:
            `grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}`
            
        });
         const token = await req.json();
         console.log(token.access_token);
        
         return token;
        
    } catch (e) {
        
            console.error('Error in API handling:', e);
        
        }
    
};

export const Happy: React.FC = () => {

    async function getArtistImage() {
        try {
            const token = await getAPI();
            const artist = await fetch('https://api.spotify.com/v1/artists/4YRxDV8wJFPHPTeXepOstw?si=EDEXGBDgRl6z1nYq35rplw', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + token.access_token
                },
            });

            const getplaylist = await artist.json();
            // console.log(getplaylist);
            return getplaylist;
        } catch (e) {
            console.error('Error fetching artist:', e);
        }
    }

    interface Artist {
        images: { url: string }[];
    }

    const [Artist, setArtist] = useState<Artist | null>(null);

    React.useEffect(() => {
        getArtistImage().then(data => setArtist(data));
    }, []);

    async function getAlbum() {
        try{
            const token = await getAPI();
            const album = await fetch('https://api.spotify.com/v1/artists/4YRxDV8wJFPHPTeXepOstw?si=EDEXGBDgRl6z1nYq35rplw/top-tracks', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + token.access_token
                },
            });
            const getalbumlist = await album.json();
            console.log('getting album list..');
            console.log(getalbumlist);
            return getalbumlist;
        } catch (e) {
            console.error('Error fetching artist:', e);
        }
    }


    interface Playlist {
        images: { url: string }[];
    }
         
    const [playlist, setPlaylist] = useState<Playlist | null>(null);
    const [showPreview, setShowPreview] = useState(false);

    React.useEffect(() => {
        getAlbum().then(data => setPlaylist(data));
    }, []);


return (
        <div>
             <div
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1666511614746-e23e3de29353?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "100vh",
                    width: "100vw",
                }}
            >
                <div className=' text-white'>

                <h1 className="text-6xl font-bold mb-4 text-center">Your thing's </h1>
                <div className="bg-white w-96 h-128 p-4 rounded-lg shadow-lg overflow-y-auto">
                    <h2 className="text-2xl font-semibold mb-4 text-center text-black">Your Playlist</h2>
{playlist?.images && playlist.images.length > 0 && (
    <img src={playlist.images[0].url} alt="Playlist Cover" className="w-full h-auto rounded-lg" />
)}


    <div>
        <button 
            onClick={() => setShowPreview(!showPreview)} 
            className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4"
        >
            {showPreview ? 'Hide Preview' : 'Show Preview'}
        </button>
        {showPreview && (
            <iframe 
                src="https://open.spotify.com/embed/artist/4YRxDV8wJFPHPTeXepOstw" 
                width="300" 
                height="380" 
                allow="encrypted-media">
            </iframe>
        )}
    </div>
                </div>
            </div>
            </div>
        </div>
    );
}
