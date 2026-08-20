import { /* React, */ useState, useEffect } from "react";
import { sourceLink, makeList } from "./assets/homePageFragments.jsx";
export default App;

  function App() {
    
    // Will read in the text file
    const [textFileAsLines, setTextFileAsLines] = useState([]);
    useEffect(() => {
      // Attempt to fetch the file from the public folder of this project
      fetch('../dataset-information.txt')
        .then((response) => response.text())
        .then((data) => {
          const lines = data.split('\n').map(line => line.trim());
          setTextFileAsLines(lines);
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
      <p>{textFileAsLines}</p>
      <h4>{textFileAsLines[7]}</h4>
      <p>{makeList(textFileAsLines)}</p>
      <p>{sourceLink(textFileAsLines[0], textFileAsLines[2])}</p>
    </div>
  );
}