import React, { useEffect, useState, useMemo } from "react";
import io from "socket.io-client";

// Connect to server

function App() {
  const socket = useMemo(() => io(process.env.REACT_APP_DEVELOPEMENT_URL), []);
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // Join a room
  const joinRoom = () => {
    if (room) {
      socket.emit("join_room", room);
    }
  };

  // Send a message to the room
  const sendMessage = () => {
    const data = {
      room,
      content: message,
      sender: socket.id,
    };
    socket.emit("send_message", data);
    setMessage("");
  };

  // Listen for incoming messages
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("receive_message"); // Cleanup
    };
  }, []);

  return (
    <div>
      <input
        type="text"
        placeholder="Room"
        value={room}
        onChange={(e) => setRoom(e.target.value)}
      />
      <button onClick={joinRoom}>Join Room</button>

      <input
        type="text"
        placeholder="Message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>

      <div>
        {messages.map((msg, index) => (
          <p key={index}>{msg.content}</p>
        ))}
      </div>
    </div>
  );
}

export default App;
