import React, { useState, useEffect, useRef } from "react";
import './Welcome.css';

function Welcome() {
    const [displayedText, setDisplayedText] = useState(""); // Text being displayed
    const [isTyping, setIsTyping] = useState(true); // Whether typing or deleting
    const [currentTextIndex, setCurrentTextIndex] = useState(0); // Index of current text
    const fullTexts = useRef(["Hi!", "Hola!", "Bonjour!", "Hallo!", "Ciao!", "Olá!", "Konnichiwa!", "Nǐ hǎo!", "Namaste!"]); // List of texts to alternate
    const typingSpeed = 150; // Speed of typing in ms
    const deletingSpeed = 100; // Speed of deleting in ms
    const pauseTime = 2000; // Pause before switching text
  
    useEffect(() => {
  
      let timeout;
  
      const typeAndDelete = () => {
        const currentFullText = fullTexts.current[currentTextIndex];
  
        if (isTyping) {
          // Typing effect
          if (displayedText.length < currentFullText.length) {
            setDisplayedText(currentFullText.slice(0, displayedText.length + 1));
            timeout = setTimeout(typeAndDelete, typingSpeed);
          } else {
            setIsTyping(false); // Switch to deleting after typing finishes
            timeout = setTimeout(typeAndDelete, pauseTime);
          }
        } else {
          // Deleting effect
          if (displayedText.length > 0) {
            setDisplayedText(currentFullText.slice(0, displayedText.length - 1));
            timeout = setTimeout(typeAndDelete, deletingSpeed);
          } else {
            setIsTyping(true); // Switch to typing the next text
            setCurrentTextIndex((prevIndex) => (prevIndex + 1) % fullTexts.current.length);
            timeout = setTimeout(typeAndDelete, typingSpeed);
          }
        }
      };
  
      timeout = setTimeout(typeAndDelete, typingSpeed);
  
      return () => clearTimeout(timeout); // Cleanup timeout on unmount
    }, [displayedText, isTyping, currentTextIndex]); // Dependencies to trigger effect

  return (
    <div className="main shapedividers_com-2104">
      <div className="sec">
        <div className="container">
          <span className="typing-effect"> {displayedText}</span>
        </div>
      </div>
    </div>
  )
}

export default Welcome;
