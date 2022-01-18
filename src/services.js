import axios from 'axios';

const apiUrl = 'https://api.thedogapi.com/v1/breeds/search';

export const getBreeds = (breedName) => {
  return axios.get(apiUrl, {
    headers: {
      'x-api-key': 'a0c164d1-5b37-4bc5-b752-f21b181a8ab4'
    },
    params: { q: `${breedName}` }
  });
}
