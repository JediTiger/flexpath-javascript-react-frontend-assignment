import { React, useState, useEffect } from "react";

export default function Search() {

   const [searchObject, setSearchObject] = useState([]);
   const [keyword, setKeyword] = useState("");
   const [searchFilter, setSearchFilter] = useState('');
   const [derivedResults, setDerivedResults] = useState([]);

   // searchObject is the whole dataset
   // enteredKeyword is the value of the key set pair
   // chosenFilter is the key of the pair
   // So the search checks the searchObject for the enteredKeyword (value) at the chosenFilter (key)
   function searchDataset(searchObject, enteredKeyword = "", chosenFilter = "model") {
      let passedFilter;
      const passedKeyword = enteredKeyword.trim().toLowerCase();   
      switch (chosenFilter.trim().toLowerCase()) {
         case "model":
            passedFilter = "Model";
            break;
         case "gender":
            passedFilter = "Gender";
            break;
         case "operatingSystem":
            passedFilter = "Operating System";
            break;
         case "behaviorClass":
            passedFilter = "";
            break;
      }
      let results = searchObject.filter(item => String(item[passedFilter]).toLowerCase());
      console.log(results);
      return results;
   }   

   useEffect(() => {
   // Successfully calls the api to fetch the search object
      fetch('/api/data/search')
         .then((response) => response.text())
         .then((data) => {
   // Search data successfully stored in an accessible var
            setSearchObject(data);
            console.log(searchObject);
            setDerivedResults(searchDataset(searchObject, "IPHONE", "MoDeL"));
        })
      .catch((error) => {
        console.error('Error reading the data file:', error);
      });
  }, []);
  // For now, successfully returns the default search page. Will move elements to their own functions once completely operational
   return (
      // A containing div so it's a single object return
      <div id="searchContainer">
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
            {derivedResults}
            <hr />
         </div>
      </div>
   );
}