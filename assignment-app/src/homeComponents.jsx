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
         <div className="container-fluid p-4">
            <div className="row g-0">
               {/* Extra column spacer as Bootstrap padding and margin do not produce enough left indent on their own */}
               <div className="col-1 ms-4"></div>
               <div className="col ps-5 pe-0">
                  {/* Page title */}
                  <h1 className="fw-normal text-dark mb-3 display-5">User Behavior Dataset</h1>
                  {/* Site description */}
                  <p className="text-dark lh-base mb-4 small">{siteDescript}</p>
                  {/* Unordered list title */}
                  <h2 className="fw-normal text-dark mt-4 mb-3 fs-1">{listTitle}</h2>
                  {/* Unordered list */}
                  <div className="text-dark small">{makeList(listItemsOnly)}</div>
                  {/* Source text and link */}
                  <p className="mt-2 small">{sourceLink(textFileAsLines[0], textFileAsLines[2])}</p>
              </div>
            </div>
         </div>
      </div>
   );
}