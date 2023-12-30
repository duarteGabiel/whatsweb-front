import { useEffect, useState } from 'react';
import './App.css';
import Image from './assets/profissao-programador logo.jpg';
import SendMassageIcon from './assets/enviar.png';
import socket from 'socket.io-client';

const io = socket('http://localhost:4000');

function App() {
  const [name, setName] = useState("");
  const [joined, setJoined] = useState(false);
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [myID, setMyID] = useState('');
  


  useEffect(() => {
    io.on("users", (users) => setUsers(users));
    io.on("message", (message) => setMessages((messages) => [...messages,message]));
    io.on("connect", () => setMyID(io.id));
  }, [])

  const handleJoin = () => {
    if(name){
      io.emit("join", name);
      setJoined(true)
    }
  }

  

  const handleMessage = () => {
    if(message){
      io.emit("message", {message, name});
      setMessage("");
    }
  }


  if(!joined){
    return (
      <div className='main-container-join'>
        <div className='title-join'>
          <h1>Bem vindo ao Bissguizap</h1>
        </div>
        <div className='container-join'>
          <h2 className='h2-title'>Digite seu nome pra entrar</h2>
          <input className='input-join' value={name} onChange={(e) => setName(e.target.value)} placeholder='Digite aqui nome'/>
          <button className='button-join' onClick={() => handleJoin()}>Entrar</button>
        </div>
      </div>
    )
  }


  return (
    <div className='container'>
      <div className='back-ground'></div>
      <div className='chat-container'>
        
        <div className='chat-contacts'>
          <div className='chat-options'></div>
          <div className='chat-item'>
            <img src={Image} className='image-profile' alt=''/>
            <div className='title-chat-container'>
              <span className='title-massage'>NetWorking Profissão Programador</span>
              <span className='last-massage'>
                {messages.length? `${messages[messages.length - 1].name}: ${messages[messages.length - 1].message}` : ''}
              </span>
            </div>
          </div>
          <div className='chat-item'>
            <img src={Image} className='image-profile' alt=''/>
            <div className='title-chat-container'>
              <span className='title-massage'>NetWorking Profissão Programador</span>
              <span className='last-massage'>
                {messages.length? `${messages[messages.length - 1].name}: ${messages[messages.length - 1].message}` : ''}
              </span>
            </div>
          </div>
        </div>

        <div className='chat-messages'>
          <div className='chat-options'>
            <div className='chat-item'>
              <img src={Image} className='image-profile' alt=''/>
              <div className='title-chat-container'>
                <span className='title-massage'>NetWorking Profissão Programador</span>
                <span className='last-massage'>
                  {users.map((user, index) => (
                    <span>{user.name}{index + 1 < users.length? ', ' : ''}</span>
                  ))}
                </span>
              </div>
            </div>
          </div>

          <div className='chat-massages-area'>
            {messages.map((message, index) => (
              <div className={message.name === myID? 'user-container-message right' : 'user-container-message left'}>
                <span 
                  key={index}
                  className={message.name === myID? 'user-my-message' : 'user-other-message'}
                >
                  <span className='my-name-chat'>{message.name? `${message.name}` : ''}</span>
                  {message.message}
                </span>
              </div>
            ))}
          </div>

          <div className='chat-input-area'>
            <input 
            className='chat-input' 
            placeholder='Menssagem'
            value={message} 
            onChange={(e) => setMessage(e.target.value)}
            />
            <img 
            src={SendMassageIcon} 
            alt='' 
            className='send-message-icon' 
            onClick={() => handleMessage()}
            />
          </div>
        </div>



      </div>
    </div>
    
    
  );
}

export default App;
