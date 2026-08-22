import { useState, useEffect } from "react";
import { ltc } from "./logToConsole.js";

export default function Search() {

   // searchObject is the whole dataset
   // enteredKeyword is the value of the key set pair
   // chosenFilter is the key of the pair
   // So the search checks the searchObject for the enteredKeyword (value) at the chosenFilter (key)
   const [chosenFilter, setChosenFilter] = useState("");
   const [enteredKeyword, setEnteredKeyword] = useState("");
   const [searchResults, setSearchResults] = useState([]);

   function executeSearch(submitEvent) {
      submitEvent.preventDefault();
   
      fetch(`/api/data/search?filterType=${chosenFilter}&keyword=${enteredKeyword.toLowerCase()}`)
      .then((response) => response.json())
      .then((data) => {
         ltc("Data is", data);
         setSearchResults(data);
      })
      .catch((error) => {
         console.error('Error reading the data file:', error);
      });
   }

   return (
      // A containing div so it's a single object returned
      <div id="searchContainer">
         <hr />
         <form onSubmit={executeSearch}>
            <p>
               {/* drop down menu for filyer type */}
               <label htmlFor="filters">Select data point to filter search by:</label>
               <select name="cars" id="filters" value={chosenFilter} onChange={(changeEvent) => setChosenFilter(changeEvent.target.value)}>
                  <option value="Model">model</option>
                  <option value="Gender">gender</option>
                  <option value="Operating System">operatingSystem</option>
                  <option value="User Behavior Class">behaviorClass</option>
               </select>
            </p>
            <p>
               {/* text box for user entered keyword */}
               <label htmlFor="keyword">Keyword:</label>
               <input type="text"
                  id="keyword"
                  name="keyword"
                  placeholder="Search by keyword"
                  value={enteredKeyword}
                  onChange={(changeEvent) => setEnteredKeyword(changeEvent.target.value)} />
               <button type="submit">Search</button>
            </p>
         </form>
         {/* The search status gets its own div so its value can change as the app runs */}
         <div id="searchStatus"><p>No entrys to display</p></div>
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
                  {searchResults.map((entry, index) => {
                     const entries = Object.values(entry);
                     return (
                        <tr key={index}>
                           <td>{entries[0]}</td>
                           <td>{entries[1]}</td>
                           <td>{entries[2]}</td>
                           <td>{entries[3]}</td>
                           <td>{entries[4]}</td>
                           <td>{entries[5]}</td>
                           <td>{entries[6]}</td>
                           <td>{entries[7]}</td>
                           <td>{entries[8]}</td>
                           <td>{entries[9]}</td>
                           <td>{entries[10]}</td>
                        </tr>
                     );
                  })}
               </tbody>
            </table>
            <hr />
         </div>
      </div>
   );
}