'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

type Users = {
    id: number;
    first_name: string;
    last_name: string;
    email: string; 
}

const images = [{imagesrc: "/images/p1.jpg"}, {imagesrc: "/images/p2.jpg"}, {imagesrc: "/images/p3.jpg"}]
const MemberPage = () => {
    const [profiles, setProfiles] = useState<Users[]>([]);

     const fetchUsers = async () => {
        const res = await fetch('/api/usersP');
        const data = await res.json();
        console.log(data)
        if (Array.isArray(data)) {
          setProfiles(data);
        } else {
          console.error("Error: Data is not an array", data);
        }
      };
    
      useEffect(() => {
        fetchUsers(); // Fetch products when the component mounts
      }, []);
    return (
      <div className="pb-8 mt-24 pt-8 w-2/5 bg-yellow-500 rounded-full">
        <h1 className="text-white text-3xl font-bold text-center mb-6 mt-6">Sellers' Profiles</h1>
        <div>
          {profiles.map((profile, image) => (
          <div key={profile.id} >
            <div >
            <Image
            src={images[image].imagesrc}
            alt='Person'
            width={100} 
            height={80}
            className="m-auto"
            />
            </div>
            
            <h3 className="text-center text-white">{profile.first_name} {profile.last_name}</h3>
            <h4 className="text-center text-white">{profile.email}</h4>
            <div className="border-b-4 border-indigo-500 w-2/5 m-auto mb-8"></div>
          </div>))}
          
        </div>
      </div>
    )
}

export default MemberPage;
