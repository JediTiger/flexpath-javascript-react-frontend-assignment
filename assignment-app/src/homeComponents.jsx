import { Link } from "react-router-dom";

function sourceLink(linkText,linkUrl) {
   return (
      <a href={linkUrl} target="_blank">{linkText}</a>
   );
}

function makeList(itemArray) {
   return (
      <ul>
      {itemArray.map((item, i) => (
         <li key={i}>
            {item.replace(/^-\s*/, '')}
         </li>
      ))}
      </ul>
   );
}

export function navigationBar() {
   return (
      <>
         <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
            <Link to="/" className="navbar-brand ms-4 nav-link" id="home">User Behavior Data</Link>
            <Link to="/Search" className="navbar-brand ms-4 nav-link" id="search">Search Through Dataset</Link>
         </nav>
      </>
   )
}

export function makeHomePageElements(textFileAsLines) {
   const siteDescript = textFileAsLines[5];
   const listTitle = textFileAsLines[7];
   const listItemsOnly = textFileAsLines.slice(9);
   return (
      <div>
         <hr />
         {/* Page title */}
         <h1>User Behavior Data</h1>
         {/* Site description */}
         <p>{siteDescript}</p>
         {/* Unordered list title */}
         <h4>{listTitle}</h4>
         {/* Unordered list */}
         <div>{makeList(listItemsOnly)}</div>
         {/* Source text and link */}
         <p>{sourceLink(textFileAsLines[0], textFileAsLines[2])}</p>
      </div>
   );
}