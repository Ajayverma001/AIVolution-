import React from 'react';

// The props now include an imageUrl for the profile picture
const ProfileCard = ({ name, age, bio, imageUrl }) => {
  return (
    <div
      className='
        bg-slate-800      
        w-80                
        rounded-xl          
        shadow-lg           
        p-6                 
        flex flex-col       
        items-center        
        text-center         
        text-white          
        transition-transform 
        duration-300        
        hover:scale-105     
        hover:shadow-2xl'
    >
      <img
        src={imageUrl}
        alt={`${name}'s profile`}
        className='w-24 h-24 rounded-full border-4 border-slate-500 object-cover mb-4'
      />

      <h1 className='text-3xl font-bold capitalize mb-1'>{name}</h1>

      <p className='text-lg text-slate-400 mb-4'>Age: {age}</p>

      <p className='text-slate-300 italic'>"{bio}"</p>
    </div>
  );
};

export default ProfileCard;