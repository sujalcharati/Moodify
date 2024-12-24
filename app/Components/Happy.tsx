"use client";
import dotenv from "dotenv";
dotenv.config();
import React, { useState } from "react";
const client_id = "";
const client_secret = "";

export const getAPI = async () => {
  try {
    console.log("access to api calling ...");
    const req = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=client_credentials&client_id=${client_id}&client_secret=${client_secret}`,
    });
    const token = await req.json();
    console.log(token.access_token);

    return token;
  } catch (e) {
    console.error("Error in API handling:", e);
  }
};

export const Happy: React.FC = () => {
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
      console.log("getting album list..");
      console.log(getalbumlist.items);
      return getalbumlist;
    } catch (e) {
      console.error("Error fetching artist:", e);
    }
  }

  interface Playlist {
    images: { url: string }[];
  }

  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  React.useEffect(() => {
    getAlbum().then((data) => setPlaylist(data));
  }, []);

  return (
    <div>
      <div
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1666511614746-e23e3de29353?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
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
            {playlist?.images && playlist.images.length > 0 && (
              <img
                src={playlist.images[0].url}
                alt="Playlist Cover"
                className="w-full h-auto rounded-lg"
              />
            )}
           

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
