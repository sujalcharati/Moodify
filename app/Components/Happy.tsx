import { error } from "console";
import dotenv from "dotenv";
dotenv.config();
import React from 'react';

export const getAPI = async () => {
    try {
        const req = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(`${process.env.client_id}:${process.env.client_secret}`)
            },
            body: new URLSearchParams({
            'grant_type': 'client_credentials'
            })
        });
         const token = await req.json();
        console.log(token);
        return token ;
    } catch (e) {
        if (e instanceof Error) {
            console.error('Error in API handling:', e.message);
        } else {
            console.error('Unknown error in API handling:', e);
        }
    }
};

export const Happy: React.FC = () => {
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

            it's happy page
            </div>
            </div>
        </div>
    );
}
