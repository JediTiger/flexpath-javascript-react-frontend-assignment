import { useState } from "react";
import { startCompute } from "./computeFunctions.js";

export default function Search({chosenFilter, setChosenFilter, 
                                 enteredKeyword, setEnteredKeyword, 
                                 searchResults, setSearchResults,
                                 isLoadingFlag, setIsLoadingFlag,
                              }) {

   const [resultsLoadingError, setResultsLoadingError] = useState(null);

   function executeSearch(submitEvent) {
      submitEvent.preventDefault();
      setIsLoadingFlag(true);
      setResultsLoadingError(null);
      fetch(`/api/data/search?filterType=${chosenFilter.toLowerCase()}&keyword=${enteredKeyword.toLowerCase()}`)
      .then((response) => response.json())
      .then((data) => {
         setSearchResults(data);
         setIsLoadingFlag(false);
})
      .catch((error) => {
         console.error('Error reading the data file:', error);
         setIsLoadingFlag(false);
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
         <div id="searchStatus">
            {isLoadingFlag ? (
               <p>Loading records, just a moment...</p>
               ) : searchResults.length === 0 ? (
               <p>No entries to display</p>
               ) : (
               <p>Displaying <strong>{searchResults.length}</strong> record{searchResults.length === 1 ? "" : "s"}</p>
               )}
         </div>
         {/* card placeholders for the various metric calculations required. */}
         <div id="metricCards">
            <div id="usageTime">
               <p>App Usage Time (min/day)</p>
               <p>Average - {startCompute(1, "usage", searchResults)} Minutes</p>
               <p>Median - {startCompute(2, "usage", searchResults)} Minutes</p>
            </div>
            <div id="screenTime">Screen On Time (hours/day)
               <p>Average - {startCompute(1, "screen", searchResults)} Hours</p>
               <p>Median - {startCompute(2, "screen", searchResults)} Hours</p>
            </div>
            <div id="numberApps">Number of Apps Installed
               <p>Average - {startCompute(1, "apps", searchResults)} Apps</p>
               <p>Median - {startCompute(2, "apps", searchResults)} Apps</p>
            </div>
            <div id="age">Age
               <p>Average - {startCompute(1, "age", searchResults)} Years old</p>
               <p>Median - {startCompute(2, "age", searchResults)} Years old</p>
            </div>
         </div>
         {/* The actual table for the search results */}
         <div id="tableStatus">
               {isLoadingFlag && <p>Loading Records...</p>}
               {resultsLoadingError && <p>{resultsLoadingError}</p>}
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
   setSearchResults: () => {},
   isLoadingFlag: () => {},
   setIsLoadingFlag: () => {},
};