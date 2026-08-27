import { startCompute } from "./computeFunctions.js";

const cardTitles = [ "App Usage Time (min/day)", "Screen On Time (hours/day)", "Number of Apps Installed", "Age" ];
const cardKeys = [ "usage", "screen", "apps", "age"];
const cardUnits = ["Minutes", "Hours", "Apps", "Years old"];

export function DisplaySearchResults({searchResults}) {
   return (
      <>
         {searchResults.map((entry, index) => {
            const entries = Object.values(entry);
            return (
               <tr key={index} className="align-middle">
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
      </>
   );
}

DisplaySearchResults.propTypes = {
   searchResults: () => {},
   setSearchResults: () => {},
};

export function CreateMetricCards({searchResults}) {
   return (
      <div id="metricCards" className="row g-5">
         {cardKeys.map((key, index) => (
            <div key={key} id={`${key}`} className="col-md-3">
               <div className="card text-center py-3 px-0 border rounded-3 h-100">
                  <h6 className="fw-bold text-dark mb-2 fs-6">{cardTitles[index]}</h6>
                  <p className="mb-3 small">
                     Average - {startCompute(1, key, searchResults)} {cardUnits[index]}
                  </p>
                  <p className="mb-0 small">
                     Median - {startCompute(2, key, searchResults)} {cardUnits[index]}
                  </p>
               </div>
            </div>
         ))}
      </div>
   )   
}

DisplaySearchResults.propTypes = {
   searchResults: () => {},
};

CreateMetricCards.propTypes = {
   searchResults: () => {},
};