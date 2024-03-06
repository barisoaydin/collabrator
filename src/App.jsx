import React, { useState, useEffect } from "react";
import "./index.css";
import "./App.css";
import esprima from "esprima";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vs } from "react-syntax-highlighter/dist/esm/styles/prism";

function CodeChecker() {
  const [code, setCode] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [userName, setUserName] = useState("");
  const [collaborators, setCollaborators] = useState([]);
  const [showNamePrompt, setShowNamePrompt] = useState(true);

  useEffect(() => {
    if (showNamePrompt) {
      const name = prompt("Please enter your name:");
      if (name !== null && name !== "") {
        setUserName(name);
        setCollaborators([name]);
        setShowNamePrompt(false);
        alert(`Welcome, ${name}!`);
      }
    }
  }, [showNamePrompt]);

  const checkCode = () => {
    try {
      esprima.parseScript(code);
      setIsValid(true);
    } catch (e) {
      setIsValid(false);
    }
  };

  const sendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages([...messages, { text: newMessage, sender: "user" }]);
      setNewMessage("");
    }
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();
    if (userName.trim() !== "") {
      alert(`Welcome, ${userName}!`);
      setCollaborators([...collaborators, userName]);
      setUserName("");
    } else {
      alert("Please enter your name.");
    }
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-brand">Collabrator</div>
      </nav>
      <div className="container">
        <form onSubmit={handleNameSubmit} className="name-form"></form>

        <div className="panel-container">
          <div className="code-container">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Write your JavaScript code here..."
            />
            <button onClick={checkCode}>Check</button>
            {isValid ? (
              <p className="validation-message">
                The code is valid JavaScript.
              </p>
            ) : (
              <p className="validation-message"></p>
            )}
          </div>
          <div className="chat-panel">
            {messages.map((message, index) => (
              <div
                key={index}
                className={
                  message.sender === "user" ? "user-message" : "other-message"
                }
              >
                {message.text}
              </div>
            ))}
            <div className="message-input">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
              />
              <button onClick={sendMessage}>Send</button>
            </div>
          </div>
        </div>

        <div className="collaborators-box">
          <h2>USERS</h2>
          <table>
            <thead></thead>
            <tbody>
              {collaborators.map((collaborator, index) => (
                <tr key={index}>
                  <td>{collaborator}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CodeChecker;
