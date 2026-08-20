import { React, useState, useEffect } from "react";

export default function Search() {

   const [searchObject, setSearchObject] = useState([]);
   useEffect(() => {
   // Will need an 'api' call to fetch the search object
      fetch('/api/data/search')
         .then((response) => response.text())
         .then((data) => {
   // Will create the search var here
            setSearchObject(data);
        })
      .catch((error) => {
        console.error('Error reading the data file:', error);
      });
  }, []);
   return (
      <>
         <p>This is the search page</p>
         <label for="filters">Select data point to filter search by:</label>
            <select name="cars" id="filters">
               <option value="volvo">model</option>
               <option value="saab">gender</option>
               <option value="mercedes">operatingSystem</option>
               <option value="audi">behaviorClass</option>
            </select>
      </>
   );
}