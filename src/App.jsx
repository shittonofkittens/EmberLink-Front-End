// App.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import ChatBox from "./components/ChatBox";

function App() {
  const { roomId } = useParams();
  return <ChatBox initialRoom={roomId || "forge"} />;
}

export default App;
