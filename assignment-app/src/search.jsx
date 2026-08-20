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
      <div>
         <hr />
         <p>
            <label htmlFor="filters">Select data point to filter search by:</label>
            <select name="cars" id="filters">
               <option value="model">model</option>
               <option value="gender">gender</option>
               <option value="operatingSystem">operatingSystem</option>
               <option value="behaviorClass">behaviorClass</option>
            </select>
         </p>
         <p>
            <label htmlFor="keyword">Keyword:</label>
            <input type="text" id="keyword" name="keyword" placeholder="Search by keyword"></input>
         </p>
         <div id="searchStatus">No records to display</div>
         <div id="metricCards">
            <div id="usageTime"></div>
            <div id="screenTime"></div>
            <div id="numberApps"></div>
            <div id="age"></div>
         </div>
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
            </table>
            <hr />
         </div>
      </div>
   );
}