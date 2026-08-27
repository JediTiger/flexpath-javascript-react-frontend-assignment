import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { makeHomePageElements, navigationBar } from "./homeComponents.jsx";
import Search from "./search/search.jsx";

export default function App() {
    
   const [textFileAsLines, setTextFileAsLines] = useState([]);
   const [chosenFilter, setChosenFilter] = useState("model");
   const [enteredKeyword, setEnteredKeyword] = useState("");
   const [searchResults, setSearchResults] = useState([]);
   const [isLoadingFlag, setIsLoadingFlag] = useState(false);
   useEffect(() => {
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
      <hr />
         <div className="container">
            <Routes>
               <Route path="/" element={<>{makeHomePageElements(textFileAsLines)}</>} />
               <Route path="/search" element={<Search 
                  chosenFilter={chosenFilter}
                  setChosenFilter={setChosenFilter}
                  enteredKeyword={enteredKeyword}
                  setEnteredKeyword={setEnteredKeyword}
                  searchResults={searchResults}
                  setSearchResults={setSearchResults}  
                  isLoadingFlag={isLoadingFlag}
                  setIsLoadingFlag={setIsLoadingFlag}
                  />}
               />
               <Route path="/NotFound" element={<NotFound />} />
            </Routes>
         </div>
      </Router>    
  )
}

function NotFound() {
  return (
    <div className="container mt-5">
      <h3>On no! That page is missing!</h3>
      <p>We are terribly sorry but the page you are looking for was not found.</p>
    </div>
  );
}