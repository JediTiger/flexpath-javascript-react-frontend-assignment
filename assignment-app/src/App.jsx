import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { makeHomePageElements } from "./assets/homePageFragments";
import Home from "./App";
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
   <>
      <Router>
         <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/NotFound" element={<NotFound />} />
         </Routes>
      </Router>    
      {makeHomePageElements(textFileAsLines)}
   </>
  )
}

// To handle any issues with pages not loading
export function NotFound() {
  return (
    <div>
      <h2>404 - Page Not Found</h2>
      <p>We are terribly sorry but the pageou are looking for does not exist.</p>
    </div>
  );
}