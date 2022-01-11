import * as React from 'react';
import { BsPlusCircleFill } from 'react-icons/bs';
import AdapterDayjs from '@mui/lab/AdapterDayjs';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import {
  getPatients,
  savePatient,
  removePatient,
  createTimeline
} from '../api/patientApi';
import { PatientDetail } from '../components/PatientDetail';
import dayjs from 'dayjs';

const onUpdateDBPatient = async patient => {
  await savePatient({
    id: patient.id,
    age: patient.age,
    gender: patient.gender,
    occupation: patient.occupation
  });
};

const onAddTimeline = async timeline => {
  await createTimeline(timeline);
};

export default function Index({ patients }) {
  const [patientsState, setPatientsState] = React.useState(
    patients.sort(
      (a, b) => dayjs(a.createdAt).unix() - dayjs(b.createdAt).unix()
    )
  );
  const [patientIndex, setPatientIndex] = React.useState(0);

  const onUpdatePatient = patient => {
    const otherPatient = patientsState.filter(p => p.id !== patient.id);
    const newPatients = [...otherPatient, patient];
    const newPatientsSorted = newPatients.sort(
      (a, b) => dayjs(a.createdAt).unix() - dayjs(b.createdAt).unix()
    );
    setPatientsState([...newPatientsSorted]);
  };

  const onDeletePatient = id => {
    removePatient(id).then(async res => {
      const newPatients = await getPatients();
      if (patientIndex === patientsState.length - 1)
        setPatientIndex(patientIndex - 1);
      setPatientsState(newPatients.data.data.patients);
    });
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="font-fancy">
        <div className="mt-6 flex justify-center sm:text-xl md:text-4xl  text-yellow font-bold tracking-wider">
          Covid Timeline Generator
        </div>

        <div className="mt-6 flex ml-auto mr-auto sm:w-full md:w-3/5 bg-light-blue rounded">
          <Tabs
            value={patientIndex}
            onChange={(event, index) => setPatientIndex(index)}
            aria-label="basic tabs example"
          >
            {patientsState.map((_patient, index) => (
              <Tab
                key={index}
                label={
                  <div className="flex flex-col">
                    <span>Patient</span>
                    <span>{index + 1}</span>
                  </div>
                }
              />
            ))}
          </Tabs>
          <div className="mt-4 ml-4 text-lighter-blue hover:text-white hover:cursor-pointer">
            {patientsState.length < 8 ? (
              <BsPlusCircleFill
                size={'24px'}
                onClick={() => {
                  savePatient({
                    age: 0,
                    gender: 'Male',
                    occupation: ''
                  }).then(async res => {
                    const newPatients = await getPatients();
                    setPatientsState(newPatients.data.data.patients);
                  });
                }}
              />
            ) : null}
          </div>
        </div>
        {patientsState.map((patient, index) => (
          <PatientDetail
            patient={patient}
            key={`patient-${index}`}
            hidden={index !== patientIndex}
            onDeletePatient={onDeletePatient}
            onUpdatePatient={onUpdatePatient}
            onUpdateDBPatient={onUpdateDBPatient}
            onAddTimeline={onAddTimeline}
          />
        ))}
      </div>
    </LocalizationProvider>
  );
}

// eslint-disable-next-line unicorn/prevent-abbreviations
export async function getStaticProps() {
  const patients = await getPatients();
  return {
    props: {
      patients: patients.data.data.patients
    }
  };
}
