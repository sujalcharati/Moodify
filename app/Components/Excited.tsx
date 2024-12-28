"use client";
import dotenv from "dotenv";
dotenv.config();
import React, { useState } from "react";
import {getAPI} from '../Components/Apistore' 


export const Excited: React.FC = () => {
    const [showPreview, setShowPreview] = useState(false);

    const [id,setId] =useState('');
  async function getAlbum() {
    try {
      const token = await getAPI();
    const album = await fetch(
      "https://api.spotify.com/v1/artists/4YRxDV8wJFPHPTeXepOstw/albums?include_groups=album,single&market=US&limit=10&offset=5",
      {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token.access_token,
        },
      }
    );
      const getalbumlist = await album.json();
      console.log(getalbumlist.items[0].id);
      setId(getalbumlist.items[0].id);

      return getalbumlist;
    } catch (e) {
      console.error("Error fetching artist:", e);
    }
  }
 getAlbum();
 const [songname, setSongname] =useState('');
 const [url,setUrl] = useState('');
 async function getSongs() {
    try {
        const token = await getAPI();
        const tracks = await fetch(
      `https://api.spotify.com/v1/albums/${id}/tracks`,
      {
        method: "GET", 
        headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token.access_token,
        },
      }
    );

    const songs = await tracks.json();
    console.log(songs.items);
    // const allsongs = songs.items.map((song: any) => {
    //   setSongname(allsongs);
    //   setUrl(song.external_urls.spotify);
    // });
}
     catch (e) {
        console.error("Error fetching artist:", e);
      }
 }   

getSongs();
  

  return (
    <div>
      <div
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1529512731903-186378156bad?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          width: "100vw",
        }}
      >
          <h1 className="text-6xl font-bold mb-4 text-center text-white">Your thing's </h1>
         <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg w-96 h-128 p-4 rounded-lg shadow-lg overflow-y-auto">
                <h2 className=" text-white">
              Your Playlist
            </h2>
            <p className="text-gray-400 text-center"> 
                Enjoy your favorite tunes and discover new music!
              </p>
            <div className="text-white">
              <a href={`${url}`} target="_blank" rel="noopener noreferrer">{songname}</a>
            </div>

              <button
                onClick={() => setShowPreview(!showPreview)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4"
              >
                {showPreview ? "Hide Preview" : "Show Preview"}
              </button>
              {showPreview && (
                <iframe
                  src="https://open.spotify.com/embed/artist/4YRxDV8wJFPHPTeXepOstw"
                  width="300"
                  height="380"
                  allow="encrypted-media"
                ></iframe>
              )}
            </div>
            <div className="p-4 bg-gray-100 bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg shadow-md w-80 fixed top-0 right-0 mr-4 mt-4">
              <h2 className="text-xl font-semibold text-center text-gray-200 mb-2">Fun Activity</h2> 
              <ul className="text-gray-200">
                {["Call or video chat with your best friend or a loved one.", "Write a poem or short story about something that made you smile", "Host a mini picnic on your balcony or in your backyard"].map((task, index) => (
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


