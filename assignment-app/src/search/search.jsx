import { useState } from "react";
import { startCompute } from "./computeFunctions.js";
import DisplaySearchResults from "./searchComponents.jsx";

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
      <div id="searchPage">
         <hr />
         <div id="searchFormAndResults" className="container-fluid p-0">
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
            <div id="metricCards" className="row g-3 mb-5">
               <div className="col-md-3">
                  <div id="usage" className="card text-center py-3 px-2 border rounded-3 h-100">
                     <h6 className="fw-bold text-dark mb-2 fs-6">App Usage Time (min/day)</h6>
                     <p className="mb-3 text-dark small">Average - {startCompute(1, "usage", searchResults)} Minutes</p>
                     <p className="mb-0 text-dark small">Median - {startCompute(2, "usage", searchResults)} Minutes</p>
                  </div>
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
                     <tr><td colSpan="11"><hr /></td></tr>
                     <DisplaySearchResults searchResults={searchResults} />
                  </tbody>
               </table>
            </div>
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