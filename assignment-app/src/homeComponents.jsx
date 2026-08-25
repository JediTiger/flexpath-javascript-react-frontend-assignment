import { Link } from "react-router-dom";

function sourceLink(linkText,linkUrl) {
   return (
      <a href={linkUrl} target="_blank" rel="noreferrer">{linkText}</a>
   );
}

function makeList(itemArray) {
   return (
      <ul className="mb-4">
      {itemArray.map((item, i) => (
         <li key={i} className="mb-1">
            {item.replace(/^-\s*/, '')}
         </li>
      ))}
      </ul>
   );
}

export function navigationBar() {
   return (
      <>
         <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top py-2">
            <Link to="/" className="navbar-brand fw-bold ms-4 nav-link" id="home">User Behavior Data</Link>
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
      <div id="homePage">
         <hr />
         <div className="container ps-5 pt-4 pe-5 col-xl-15">
            {/* Page title */}
            <h1 className="fw-normal text-dark mb-3" style={{ fontSize: "3rem", letterSpacing: "-1px" }}>User Behavior Dataset</h1>
            {/* Site description */}
            <p className="text-dark lh-base mb-4" style={{ fontSize: "0.95rem", maxWidth: "950px" }}>{siteDescript}</p>
            {/* Unordered list title */}
            <h4 className="fw-normal text-dark mt-4 mb-3" style={{ fontSize: "2.3rem" }}>{listTitle}</h4>
            {/* Unordered list */}
            <div className="text-dark" style={{ fontSize: "0.9rem" }}>{makeList(listItemsOnly)}</div>
            {/* Source text and link */}
            <p className="mt-2" style={{ fontSize: "0.9rem" }}>{sourceLink(textFileAsLines[0], textFileAsLines[2])}</p>
         </div>
      </div>
   );
}