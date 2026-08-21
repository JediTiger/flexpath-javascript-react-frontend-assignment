import { React, useState, useEffect } from "react";
import { ltc } from "./logToConsole.js";

export default function Search({searchObject, setSearchObject, derivedResults, setDerivedResults}) {

   // searchObject is the whole dataset
   // enteredKeyword is the value of the key set pair
   // chosenFilter is the key of the pair
   // So the search checks the searchObject for the enteredKeyword (value) at the chosenFilter (key)
   function searchDataset(searchObject = [], enteredKeyword = "", chosenFilter = "Model") {
      if (!Array.isArray(searchObject)) return [];
      const passedKeyword = String(enteredKeyword).trim().toLowerCase();
      ltc("User entered filter", chosenFilter);
      ltc("User entered keyword is", enteredKeyword);
      ltc("passedKeyword is", passedKeyword);
      let results = searchObject.filter(item => item[chosenFilter].toLowerCase().includes(passedKeyword.toLowerCase()));
      ltc("Results of searchObject search", results);
      return results;
   }   

   useEffect(() => {
   // Successfully calls the api to fetch the search object
      if (searchObject.length === 0) {
         fetch('/api/data/search')
         .then((response) => response.json())
         .then((data) => {
            setSearchObject(data);
            setDerivedResults(searchDataset(data, "OnePlus 9", "model"));
            ltc("CONTENTS or derivedResults var", derivedResults);
            ltc("Size of results", derivedResults.length)
            ltc("Results of search", derivedResults);
         })
      .catch((error) => {
        console.error('Error reading the data file:', error);
      });
   }
  }, [searchObject, derivedResults, setDerivedResults, setSearchObject]);
  // For now, successfully returns the default search page. Will move elements to their own functions once completely operational
   return (
      // A containing div so it's a single object return
      <div id="searchContainer">
         <hr />
         <p>
            {/* drop down menu for filyer type */}
            <label htmlFor="filters">Select data point to filter search by:</label>
            <select name="cars" id="filters">
               <option value="Model">model</option>
               <option value="Gender">gender</option>
               <option value="Operating System">operatingSystem</option>
               <option value="User Behavior Class">behaviorClass</option>
            </select>
         </p>
         <p>
            {/* text box for user entered keyword */}
            <label htmlFor="keyword">Keyword:</label>
            <input type="text" id="keyword" name="keyword" placeholder="Search by keyword"></input>
            <button type="submit">Search</button>
         </p>
         {/* The search status gets its own div so its value can change as the app runs */}
         <div id="searchStatus"><p>No Records to display</p></div>
         {/* card placeholders for the various metric calculations required. Will do later */}
         <div id="metricCards">
            <div id="usageTime">App Usage Time (min/day)</div>
            <div id="screenTime">Screen On Time (hours/day)</div>
            <div id="numberApps">Number of Apps Installed</div>
            <div id="age">Age</div>
         </div>
         {/* The actual table for the search results */}
         <div id="searchResultsTable">
            <table>
               <thead>
                  <tr>
                     <th>User ID</th>
                     <th>Device Model</th>
                     <th>Operating System</th>
                     <th>App Usage Time (min/day)</th>
                     <th>Screen On Time (hours/day)</th>
                     <th>Battery Drain (mAh/day)</th>
                     <th>Number of Apps Installed</th>
                     <th>Data Usage (MB/day)</th>
                     <th>Age</th>
                     <th>Gender</th>
                     <th>User Behavior Class</th>
                  </tr>
               </thead>
               <tbody>
               {/* Something will go here to show the search results in the table correctly */}
               </tbody>
            </table>
            Contents of derivedResults array: {JSON.stringify(derivedResults)}
            <hr />
         </div>
      </div>
   );
}