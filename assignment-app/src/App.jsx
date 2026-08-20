import React from "react";
import { useState } from "react";
import { useEffect } from "react";
export default App;

  function App() {
    
    // Will read in the text file
    const [text, setText] = useState('');
    const [sourceLink, setSourceLink] = useState('');
    const [bodyText, setBodyText] = useState('');
    const [listItems, setListItems] = useState([]);
    console.log(text);
    useEffect(() => {
      // Attempt to fetch the file from the public folder of this project
      fetch('../dataset-information.txt')
        .then((response) => response.text())
        .then((data) => {
          setText(data);
          console.log(data);
        })
      .catch((error) => {
        console.error('Error reading the text file:', error);
      });
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        {/* <p> tag is a placeholder, You'll need to change the tag/component type later*/}
        <p className="navbar-brand ms-4 nav-link" id="home">User Behavior Data</p>
        <p className="navbar-brand ms-4 nav-link" id="search">Search Behavior Data</p>
      </nav>
      <p>Some text</p>
      <hr />
      <p>{text}</p>
    </div>
  );
}