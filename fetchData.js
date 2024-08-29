const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: process.env.KEY
    } 
};

export const fetchData = async (endpoint) => {
    const response = await fetch(`https://api.themoviedb.org/3/${endpoint}`, options);
    const data = await response.json();
    return data;
}
