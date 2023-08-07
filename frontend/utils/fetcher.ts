export default async function fetcher(url : any, options : RequestInit) {

    const response = await fetch(url, options);

    const data = await response.json();

    return data;
    
}