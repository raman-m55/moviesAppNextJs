const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZmZmMWQzNzI1OTY5MTYxYmY5ZDFiNTY1ZGQ3ODFlOSIsInN1YiI6IjY1NmUzY2JlM2RjMzEzMDBhY2FiZDQ0MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.X1EEOiHGjVTiz8puQ6c38bBA2u27UHGfIeDS-zatF6g'
    } ,
    cache: 'no-store'
  };


export const fetchData = async (endpoint) => {
        const response = await fetch(`https://api.themoviedb.org/3/${endpoint}` ,  options);
        const data = await response.json();
        return data;
}