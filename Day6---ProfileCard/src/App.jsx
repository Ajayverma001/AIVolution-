import React from 'react';
import ProfileCard from './components/ProfileCard';

const App = () => {
  const users = [
    { name: 'Johnny', age: 20, bio: 'Loves to code and travel the world.', },
    { name: 'Joy', age: 22, bio: 'A passionate graphic designer and artist.' },
    { name: 'Alice', age: 18, bio: 'Student and an aspiring web developer.' },
    { name: 'Sam', age: 30, bio: 'Project manager with a love for agile.' },
    { name: 'Chris', age: 25, bio: 'A UX designer focused on user-centric solutions.' },
  ];

  return (
    <div className='flex flex-wrap gap-8 p-8 justify-center bg-slate-900 min-h-screen'>
      {users.map((user, index) => (
        <ProfileCard
          key={index}
          name={user.name}
          age={user.age}
          bio={user.bio}
          imageUrl={`https://i.pravatar.cc/150?u=${user.name}`}
        />
      ))}
    </div>
  );
};

export default App;