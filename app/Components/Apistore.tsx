"use client"

const client_id = "";
const client_secret = "";

export const getAPI = async () => {

    try {
      console.log("access to spotify  ...");
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
  
