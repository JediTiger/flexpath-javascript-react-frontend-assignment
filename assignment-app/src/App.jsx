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
  const siteDescript = textFileAsLines[5];
  const listTitle = textFileAsLines[7];
  const listItemsOnly = textFileAsLines.slice(9);
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        {/* <p> tag is a placeholder, You'll need to change the tag/component type later*/}
        <p className="navbar-brand ms-4 nav-link" id="home">User Behavior Data</p>
        <p className="navbar-brand ms-4 nav-link" id="search">Search Through Dataset</p>
      </nav>
      <hr />
      {/* Page title */}
      <h1>User Behavior Data</h1>
      {/* Site description */}
      <p>{siteDescript}</p>
      {/* Unordered list title */}
      <h4>{listTitle}</h4>
      {/* Unordered list */}
      <div>{makeList(listItemsOnly)}</div>
      {/* Source text and link */}
      <p>{sourceLink(textFileAsLines[0], textFileAsLines[2])}</p>
    </div>
  );
}