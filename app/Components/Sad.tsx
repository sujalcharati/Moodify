"use client";
import dotenv from "dotenv";
dotenv.config();
import React, { useEffect, useState } from "react";
import {getAPI} from '../Components/Apistore' 


export const Sad: React.FC = () => {
    const [showPreview, setShowPreview] = useState(false);

    const [songname,setSongname] =useState('');
    //  const [url,setUrl] = useState('');

  async function getAlbum() {
    try {
      const token = await getAPI();
    const album = await fetch(
      "https://api.spotify.com/v1/playlists/2sOMIgioNPngXojcOuR4tn/tracks?market=US&fields=items(added_by.id,track(name,href,album(name,href)))&limit=10&offset=5",
      {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token.access_token,
        },
      }
    );
    const getalbumlist = await album.json();
    console.log(getalbumlist);
   
   
    const songNames = getalbumlist.items.map((item: any) => item.track.name).join(", ");
    setSongname(songNames);
    //   return getalbumlist;
    } 
    catch (e) {
      console.error("Error fetching artist:", e);
    }
  }

  useEffect(()=>{
    getAlbum()
  },[])
  
  return (
    <div>
      <div
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1508556919487-845f191e5742?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          width: "100vw",
        }}
      >
          <h1 className="text-4xl font-bold mb-4 text-center text-white">Feeling Sad? Let's slow things down... </h1>
         <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg w-96 h-128 p-4 rounded-lg shadow-lg overflow-y-auto">
                <h2 className=" text-white">
              Your Playlist
            </h2>
            <p className="text-gray-400 text-center"> 
                Enjoy your favorite tunes and discover new music!
              </p>
            <div className="text-white">
              {/* <a href={`${url}`} target="_blank" rel="noopener noreferrer"> {songname}</a> */}
              {songname}
            </div>

              <button
                onClick={() => setShowPreview(!showPreview)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4"
              >
                {showPreview ? "Hide Preview" : "Show Preview"}
              </button>
              {showPreview && (
              <iframe style={{ borderRadius: "12px" }} src="https://open.spotify.com/embed/playlist/2sOMIgioNPngXojcOuR4tn?utm_source=generator" width="100%" height="380" frameBorder="0" allowFullScreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
              )}
            </div>
            <div className="p-4 bg-gray-100 bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg shadow-md w-80 fixed top-0 right-0 mr-4 mt-4">
              <h2 className="text-xl font-semibold text-center text-gray-200 mb-2">Fun Activity</h2> 
              <ul className="text-gray-200">
                {["Take a walk.", "Wrap yourself in a cozy blanket, grab a cup of tea, and watch your favorite comfort show", "Host a mini picnic on your balcony or in your backyard"].map((task, index) => (
                  <li key={index} className="flex items-center mb-2">
                    <input
                      type="checkbox"
                      id={`task-${index}`}
                      className="mr-2"
                    />
                    <label htmlFor={`task-${index}`}>{task}</label>
                  </li>
                ))}
              </ul>             
            </div>
            
              
             
            </div>
            </div>
   
  );
};


