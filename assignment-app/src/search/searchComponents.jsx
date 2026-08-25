export default function DisplaySearchResults({searchResults}) {
   return (
      <>
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
      </>
   );
}

DisplaySearchResults.propTypes = {
   searchResults: () => {},
   setSearchResults: () => {},
};