import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { makeHomePageElements, navigationBar } from "./homeComponents.jsx";
import Search from "./Search.jsx";

export default function App() {
    
   const [textFileAsLines, setTextFileAsLines] = useState([]);
   const [chosenFilter, setChosenFilter] = useState("");
   const [enteredKeyword, setEnteredKeyword] = useState("");
   const [searchResults, setSearchResults] = useState([]);

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
      <Router>
      {navigationBar()}
         <Routes>
            <Route path="/" element={<>{makeHomePageElements(textFileAsLines)}</>} />
            <Route path="/search" element={<Search 
               chosenFilter={chosenFilter}
               setChosenFilter={setChosenFilter}
               enteredKeyword={enteredKeyword}
               setEnteredKeyword={setEnteredKeyword}
               searchResults={searchResults}
               setSearchResults={setSearchResults}               />}
            />
            <Route path="/NotFound" element={<NotFound />} />
         </Routes>
      </Router>    
  )
}

// To handle any issues with pages not loading
export function NotFound() {
  return (
    <div>
      <h3>On no! That page is missing!</h3>
      <p>We are terribly sorry but the page you are looking for was not found.</p>
    </div>
  );
}