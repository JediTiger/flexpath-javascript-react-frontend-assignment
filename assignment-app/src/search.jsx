import { useState, useEffect } from "react";
import { ltc } from "./logToConsole.js";
import { computeAve, computeMedian } from "./computeFunctions.js";
export default function Search({chosenFilter, setChosenFilter, enteredKeyword, setEnteredKeyword, searchResults, setSearchResults}) {

   // searchObject is the whole dataset
   // enteredKeyword is the value of the key set pair
   // chosenFilter is the key of the pair
   // So the search checks the searchObject for the enteredKeyword (value) at the chosenFilter (key)

   function executeSearch(submitEvent) {
      submitEvent.preventDefault();
   
      fetch(`/api/data/search?filterType=${chosenFilter.toLowerCase()}&keyword=${enteredKeyword.toLowerCase()}`)
      .then((response) => response.json())
      .then((data) => {
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
               <select name="filters" id="filters" value={chosenFilter} onChange={(changeEvent) => setChosenFilter(changeEvent.target.value)}>
                  <option value="model">model</option>
                  <option value="gender">gender</option>
                  <option value="operatingsystem">operatingSystem</option>
                  <option value="behaviorclass">behaviorClass</option>
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
            <div id="usageTime">
               <p>App Usage Time (min/day)</p>
               <p>{computeAveUsage()} minutes</p>
               <p>{computeMedianUsage()} minutes</p>
            </div>
            <div id="screenTime">Screen On Time (hours/day)
               <p>{computeAveUsage()} minutes</p>
               <p>{computeMedianUsage()} minutes</p>
            </div>
            <div id="numberApps">Number of Apps Installed
               <p>{computeAveUsage()} minutes</p>
               <p>{computeMedianUsage()} minutes</p>
            </div>
            <div id="age">Age</div>
               <p>{computeAveUsage()} minutes</p>
               <p>{computeMedianUsage()} minutes</p>
            </div>
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

Search.propTypes = {
   chosenFilter: () => {},
   setChosenFilter: () => {},
   enteredKeyword: () => {},
   setEnteredKeyword: () => {},
   searchResults: () => {},
   setSearchResults: () => {}
};