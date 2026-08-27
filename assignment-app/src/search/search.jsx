import { useState } from "react";
import { DisplaySearchResults, CreateMetricCards } from "./searchComponents.jsx";

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
         <div id="searchFormAndResults" className="container">
            <form onSubmit={executeSearch}>
               <div className="row">
                  <div className="col-12 col-md-4 col-lg-3">
                     <div id="dropdown" className="mb-3">
                        {/* drop down menu for filyer type */}
                        <label htmlFor="filters" className="form-label small mb-1 d-block">Select data point to filter search by:</label>
                        <select name="filters" id="filters" className="form-select w-auto form-select-sm" value={chosenFilter} onChange={(changeEvent) => setChosenFilter(changeEvent.target.value)}>
                           <option value="model">model</option>
                           <option value="gender">gender</option>
                           <option value="operatingsystem">operatingSystem</option>
                           <option value="behaviorclass">behaviorClass</option>
                        </select>
                     </div>
                     <div id="keywordInput" className="mb-3">
                        {/* text box for user entered keyword */}
                        <input type="text"
                           id="keyword"
                           name="keyword"
                           className="form-control form-control-sm py-2"
                           placeholder="Search by keyword"
                           value={enteredKeyword}
                           onChange={(changeEvent) => setEnteredKeyword(changeEvent.target.value)} />
                        <button type="submit" className="btn-sm w-100 border bg-white mt-2">Search</button>
                     </div>
                  </div>
               </div>
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
            {/* metric cards */}
            <CreateMetricCards searchResults={searchResults} />
            {/* The actual table for the search results */}
            <div id="tableStatus">
                  {isLoadingFlag && <p>Loading Records...</p>}
                  {resultsLoadingError && <p>{resultsLoadingError}</p>}
            </div>
            {/* The actual table for the search results */}
            <div id="searchResultsTable" className="table-responsive mt-4">
               <table className="table table-striped">
                  <thead>
                     <tr className="border-bottom">
                        <th scope="col">User ID</th>
                        <th scope="col">Device Model</th>
                        <th scope="col">Operating System</th>
                        <th scope="col">App Usage Time (min/day)</th>
                        <th scope="col">Screen On Time (hours/day)</th>
                        <th scope="col">Battery Drain (mAh/day)</th>
                        <th scope="col">Number of Apps Installed</th>
                        <th scope="col">Data Usage (MB/day)</th>
                        <th scope="col">Age</th>
                        <th scope="col">Gender</th>
                        <th scope="col">User Behavior Class</th>
                     </tr>
                  </thead>
                  <tbody>
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