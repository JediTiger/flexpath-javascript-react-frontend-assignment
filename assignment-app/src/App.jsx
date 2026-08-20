import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { makeHomePageElements, navigationBar } from "./assets/homePageFragments.jsx";
import Search from "./Search";

export default function App() {
    
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
      <Router>
      {navigationBar()}
         <Routes>
            <Route path="/" element={<>{makeHomePageElements(textFileAsLines)}</>} />
            <Route path="/search" element={<Search />} />
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