import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export const getPatients = async () => {
  return await axios({
    url: BASE_URL + '/graphql',
    method: 'post',
    data: {
      query: `
        query Patients {
          patients {
            id
            gender
            age
            occupation
            timelines {
              id
              fromDate
              toDate
              detail
              locationType
              locationName
            }
          }
        }
        `
    }
  });
};
