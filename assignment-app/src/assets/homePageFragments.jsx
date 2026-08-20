export function sourceLink(linkText,linkUrl) {
   return (
      <a href={linkUrl} target="_blank">{linkText}</a>
   );
}

export function makeList(itemArray) {
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