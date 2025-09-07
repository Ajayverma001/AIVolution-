import React, { useEffect, useState, useRef } from 'react'
import { io } from 'socket.io-client'

const SERVER = import.meta.env.VITE_SERVER || 'http://localhost:4000'

export default function Chat({ username, room = 'global' }) {
  const [socket, setSocket] = useState(null)
  const [messages, setMessages] = useState([])
  const [online, setOnline] = useState([])
  const [input, setInput] = useState('')
  const [typingUsers, setTypingUsers] = useState({})
  const msgRef = useRef(null)

  useEffect(() => {
    const s = io(SERVER, { transports: ['websocket'] })
    setSocket(s)

    s.on('connect', () => {
      s.emit('join', { username, room })
    })

    s.on('room-messages', (msgs) => setMessages(msgs))
    s.on('new-message', (m) => setMessages(prev => [...prev, m]))
    s.on('online-users', (list) => setOnline(list))
    s.on('user-typing', ({ socketId, username: uname, typing }) => {
      setTypingUsers(prev => ({ ...prev, [socketId]: typing ? uname : null }))
    })

    return () => {
      s.disconnect()
    }
  }, [username, room])

  useEffect(() => {
    if (!msgRef.current) return
    msgRef.current.scrollTop = msgRef.current.scrollHeight
  }, [messages])

  function sendMessage() {
    if (!input.trim()) return
    socket.emit('send-message', { room, text: input.trim() })
    setInput('')
    socket.emit('typing', { room, typing: false })
  }

  let typingLine = Object.values(typingUsers).filter(Boolean)
  typingLine = typingLine.length ? `${typingLine.join(', ')} typing...` : ''

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ width: 250, borderRight: '1px solid #ddd', padding: 10 }}>
        <h3>Room: {room}</h3>
        <h4>Online</h4>
        <ul>
          {online.map(u => <li key={u.socketId}>{u.username}</li>)}
        </ul>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div ref={msgRef} style={{ flex: 1, overflowY: 'auto', padding: 10 }}>
          {messages.map(m => (
            <div key={m.id} style={{ marginBottom: 8 }}>
              <strong>{m.username}:</strong> {m.text} <div style={{ fontSize: 11, color: '#888' }}>{new Date(m.createdAt).toLocaleTimeString()}</div>
            </div>
          ))}
        </div>

        <div style={{ padding: 10, borderTop: '1px solid #eee' }}>
          <div style={{ marginBottom: 6, color: '#666' }}>{typingLine}</div>
          <input
            value={input}
            onChange={(e) => {
              setInput(e.target.value)
              socket.emit('typing', { room, typing: e.target.value.length > 0 })
            }}
            onKeyDown={(e) => { if (e.key === 'Enter') sendMessage() }}
            placeholder="Type a message and press Enter"
            style={{ width: '80%' }}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  )
}