"use client"

const client_id = "96f499b29dc0413fb1954b23adef82c4";
const client_secret = "3401f68cf23a4fe3a4d262cd30070d05";

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
  
