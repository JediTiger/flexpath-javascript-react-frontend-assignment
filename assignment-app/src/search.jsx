import { React, useState, useEffect } from "react";

export default function Search() {

   const [searchObject, setSearchObject] = useState([]);
   useEffect(() => {
   // Successfully calls the api to fetch the search object
      fetch('/api/data/search')
         .then((response) => response.text())
         .then((data) => {
   // Search data successfully stored in an accessible var
            setSearchObject(data);
        })
      .catch((error) => {
        console.error('Error reading the data file:', error);
      });
  }, []);
  // For now, successfully returns the default search page. Will move elements to their own functions once completely operational
   return (
      // A containing div so it's a single object return
      <div>
         <hr />
         <p>
            {/* drop down menu for filyer type */}
            <label htmlFor="filters">Select data point to filter search by:</label>
            <select name="cars" id="filters">
               <option value="model">model</option>
               <option value="gender">gender</option>
               <option value="operatingSystem">operatingSystem</option>
               <option value="behaviorClass">behaviorClass</option>
            </select>
         </p>
         <p>
            {/* text box for user entered keyword */}
            <label htmlFor="keyword">Keyword:</label>
            <input type="text" id="keyword" name="keyword" placeholder="Search by keyword"></input>
         </p>
         {/* The search status gets its own div so its value can change as the app runs */}
         <div id="searchStatus"><p>No Records to display</p></div>
         {/* card placeholders for the various metric calculations required */}
         <div id="metricCards">
            <div id="usageTime">App Usage Time (min/day)</div>
            <div id="screenTime">Screen On Time (hours/day)</div>
            <div id="numberApps">Number of Apps Installed</div>
            <div id="age">Age</div>
         </div>
         {/* The actual table for the search results. Default is just the drop down menu for filyer type */}
         <div id="searchResultsTable">
            <table>
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
               {/* Logic for searching will go here so it displays in the table correctly */}

            </table>
            <hr />
         </div>
      </div>
   );
}