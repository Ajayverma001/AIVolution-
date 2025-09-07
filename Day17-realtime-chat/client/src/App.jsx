import React, { useState } from 'react'
import Chat from './components/Chat'
import Login from './components/Login'

export default function App() {
  const [user, setUser] = useState(null)
  const [room, setRoom] = useState('global')

  if (!user) return <Login onLogin={(u, r) => { setUser(u); setRoom(r || 'global') }} />
  return <Chat username={user} room={room} />
}