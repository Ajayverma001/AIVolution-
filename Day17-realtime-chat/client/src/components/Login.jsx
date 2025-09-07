import React, { useState } from 'react'

export default function Login({ onLogin }) {
  const [name, setName] = useState('')
  const [room, setRoom] = useState('global')

  return (
    <div style={{ padding: 20 }}>
      <h2>Enter chat</h2>
      <input placeholder="Your name" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Room (optional)" value={room} onChange={e => setRoom(e.target.value)} />
      <button disabled={!name.trim()} onClick={() => onLogin(name.trim(), room.trim())}>Join</button>
    </div>
  )
}