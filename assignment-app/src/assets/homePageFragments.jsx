export function sourceLink(linkText,linkUrl) {
    return (
        <a href={linkUrl} target="_blank">{linkText}</a>
    );
}

export function makeList(x) {
    return (
        <p>{x}</p>
    );
}