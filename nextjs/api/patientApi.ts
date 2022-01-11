import axios from 'axios';
import { Patient } from '../models/patient';
import { Timeline } from '../models/timeline';

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
            createdAt
            timelines {
              id
              fromDate
              toDate
              detail
              locationType
              locationName
              createdAt
            }
          }
        }
        `
    }
  });
};

export const savePatient = async (patient: Patient) => {
  return await axios({
    url: BASE_URL + '/graphql',
    method: 'post',
    data: {
      query: `
        mutation createPatient {
          createPatient(
            ${!!patient.id ? `id: "${patient.id}",` : ''}
            age: ${patient.age},
            gender: "${patient.gender}",
            occupation: "${patient.occupation}"
          ) {
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
              createdAt
            }
          }
        }
        `
    }
  });
};

export const removePatient = async (id: string) => {
  return await axios({
    url: BASE_URL + '/graphql',
    method: 'post',
    data: {
      query: `
        mutation removePatient {
          removePatient(
            id: "${id}"
          )
        }
        `
    }
  });
};

export const removeTimeline = async (id: string) => {
  return await axios({
    url: BASE_URL + '/graphql',
    method: 'post',
    data: {
      query: `
        mutation removeTimeline {
          removeTimeline(
            id: "${id}"
          )
        }
        `
    }
  });
};

export const createTimeline = async (timeline: Timeline) => {
  return await axios({
    url: BASE_URL + '/graphql',
    method: 'post',
    data: {
      query: `
        mutation createTimeline {
          createTimeline(
            locationName: "${timeline.locationName}",
            locationType: "${timeline.locationType}",
            detail: "${timeline.detail}",
            toDate: "${timeline.toDate}",
            fromDate: "${timeline.fromDate}",
            patientId: "${timeline.patientId}"
          ) {
            id
            fromDate
            toDate
            detail
            locationType
            locationName
            createdAt
          }
        }
        `
    }
  });
};
