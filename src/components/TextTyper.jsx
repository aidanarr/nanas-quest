import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const TextTyper=({
// now the phrase, interval and HTML element desired will come via props and we have some default values here
  text = "",
  interval,
  setPreventClick,
  preventClick,
}) => {
  const [typedText, setTypedText] = useState("");
  const typingRender = (text, updater, interval) => {

    let localTypingIndex = 0;
    let localTyping = "";
    if (text) {
      let printer = setInterval(() => {
        if (localTypingIndex < text.length) {
          updater((localTyping += text[localTypingIndex]));
          localTypingIndex += 1;
          !preventClick ? setPreventClick(true) : false;
        } else {
          setPreventClick(false);
          localTypingIndex = 0;
          localTyping = "";
          clearInterval(printer);
        }
      }, interval);
    }
  };
  useEffect(() => {
    typingRender(text, setTypedText, interval);
  }, [text]);
  return <p className="typed-text">{typedText}</p>

//  [text, interval]);
}

TextTyper.propTypes = {
  setPreventClick: PropTypes.func,
  preventClick: PropTypes.bool,
  text: PropTypes.string,
  interval: PropTypes.number,
}

export default TextTyper