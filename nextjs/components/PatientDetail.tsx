import {
  DateTimePicker,
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimePicker
} from '@mui/lab';
import { MenuItem, Select, Snackbar, TextField, Tooltip } from '@mui/material';
import dayjs from 'dayjs';
import { useState } from 'react';
import { Gender, Patient } from '../models/patient';
import { Timeline as TimelineModel } from '../models/timeline';
import isBetween from 'dayjs/plugin/isBetween';
import { TimelineDetail } from './TimelineDetail';
import { removeTimeline } from '../api/patientApi';
dayjs.extend(isBetween);

interface PatientDetailProp {
  patient: Patient;
  hidden: boolean;
  onDeletePatient: (id: string) => void;
  onUpdatePatient: (patient: Patient) => void;
  onUpdateDBPatient: (patient: Patient) => void;
  onAddTimeline: (timeline: TimelineModel) => void;
}

export const PatientDetail = ({
  patient,
  onDeletePatient,
  onUpdatePatient,
  onUpdateDBPatient,
  onAddTimeline,
  hidden
}: PatientDetailProp) => {
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [newTimeline, setNewTimeline] = useState<TimelineModel>({
    patientId: patient.id,
    fromDate: dayjs().toDate(),
    toDate: dayjs().toDate(),
    locationType: 'INDOOR',
    detail: '',
    locationName: ''
  } as TimelineModel);
  if (hidden || !patient) return null;

  const onRemoveTimeline = (day: string) => {
    const timelines = patient.timelines.filter(t =>
      dayjs(t.fromDate).isSame(dayjs(day), 'date')
    );
    timelines.forEach(t => removeTimeline(t.id));
    const newTimelines = patient.timelines.filter(
      t => !timelines.some(p => p.id === t.id)
    );
    onUpdatePatient({
      ...patient,
      timelines: [...newTimelines]
    });
  };

  const onAddNewTimeline = (): boolean => {
    const { timelines } = patient;
    let isOverlapped = false;
    timelines.map(timeline => {
      if (isOverlapped) return;
      if (
        dayjs(newTimeline.fromDate).isBetween(
          timeline.fromDate,
          timeline.toDate,
          null,
          '[]'
        ) ||
        dayjs(newTimeline.toDate).isBetween(
          timeline.fromDate,
          timeline.toDate,
          null,
          '[]'
        ) ||
        dayjs(newTimeline.fromDate).isAfter(newTimeline.toDate)
      ) {
        isOverlapped = true;
        return;
      }
    });
    if (isOverlapped) {
      setIsSnackbarOpen(true);
      setSnackbarMessage('Timeline conflicted!!!, please recheck');
      return false;
    }
    patient.timelines.push(newTimeline);
    onUpdatePatient({
      ...patient
    });
    onAddTimeline(newTimeline);
    return true;
  };

  const verifyButton = () => {
    if (
      (newTimeline.locationType === 'INDOOR' ||
        newTimeline.locationType === 'OUTDOOR') &&
      (newTimeline.locationName == null || newTimeline.locationName === '')
    )
      return true;
    return false;
  };
  return (
    <>
      <div className="mt-6 px-4 md:px-0 ml-auto mr-auto sm:w-full md:w-3/5">
        <div className="flex justify-between">
          <div className="mt-6 flex justify-center text-2xl text-yellow font-bold tracking-wider">
            Patient Information
          </div>
          <button
            type="button"
            className="mt-6 text-white bg-red focus:ring-4 focus:ring-red-300 rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            onClick={() => onDeletePatient(patient.id)}
          >
            Remove Patient
          </button>
        </div>
        <div className="border-2 rounded-sm border-light-blue py-6 flex bg-light-blue">
          <div className="px-4">
            <Select
              label="Gender"
              value={patient.gender}
              onChange={event => {
                onUpdatePatient({
                  ...patient,
                  gender: event.target.value as Gender
                });
              }}
              onBlur={() => onUpdateDBPatient(patient)}
            >
              <MenuItem value={'Male'}>Male</MenuItem>
              <MenuItem value={'Female'}>Female</MenuItem>
            </Select>
          </div>
          <div className="px-4">
            <TextField
              label="Age"
              variant="standard"
              value={patient.age}
              onChange={event => {
                if (isNaN(event.target.value as unknown as number)) {
                  onUpdatePatient({
                    ...patient,
                    age: 0
                  });
                } else {
                  onUpdatePatient({
                    ...patient,
                    age: parseInt(event.target.value)
                  });
                }
              }}
              onBlur={() => onUpdateDBPatient(patient)}
            />
          </div>
          <div className="px-4 w-3/5">
            <TextField
              label="Occupation"
              variant="standard"
              fullWidth
              color="primary"
              value={patient.occupation}
              onChange={event => {
                onUpdatePatient({
                  ...patient,
                  occupation: event.target.value
                });
              }}
              onBlur={() => onUpdateDBPatient(patient)}
            />
          </div>
        </div>
      </div>
      <div className="mt-6 ml-auto mr-auto px-4 md:px-0 w-full md:w-3/5">
        <div className="flex justify-left">
          <div className="mt-6 flex justify-center text-2xl text-yellow font-bold tracking-wider">
            Timeline
          </div>
        </div>
      </div>
      <div className="mt-6 ml-auto mr-auto w-full lg:w-3/5 flex px-4 md:px-0 flex-col-reverse lg:flex-row">
        <TimelineDetail patient={patient} onRemoveTimeline={onRemoveTimeline} />
        <div className="flex flex-col w-full lg:w-2/5 ml-0 mb-6 lg:ml-5 p-4 border-2 rounded-sm border-light-blue bg-light-blue self-start">
          <div className="flex">
            <div className="text-white w-3/5">
              <DateTimePicker
                renderInput={properties => <TextField {...properties} />}
                label="From"
                value={newTimeline.fromDate}
                onChange={newValue => {
                  const newDate = dayjs(newValue).get('date');
                  const newMonth = dayjs(newValue).get('month');
                  const newYear = dayjs(newValue).get('year');
                  const toDate = dayjs(newTimeline.toDate)
                    .set('year', newYear)
                    .set('month', newMonth)
                    .set('date', newDate)
                    .toDate();

                  setNewTimeline({
                    ...newTimeline,
                    fromDate: newValue,
                    toDate
                  });
                }}
              />
            </div>
            <div className="pl-6 w-2/5">
              <TimePicker
                label="To"
                value={newTimeline.toDate}
                onChange={newValue => {
                  setNewTimeline({
                    ...newTimeline,
                    toDate: newValue
                  });
                }}
                renderInput={parameters => <TextField {...parameters} />}
              />
            </div>
          </div>
          <div className="flex">
            <div className="pt-6 w-full">
              <TextField
                label="Detail"
                multiline
                rows={4}
                sx={{ width: '100%' }}
                value={newTimeline.detail}
                onChange={event => {
                  setNewTimeline({
                    ...newTimeline,
                    detail: event.target.value
                  });
                }}
              />
            </div>
          </div>
          <div className="flex pt-6 w-full">
            <Tooltip title="Location Type">
              <Select
                label="Location Type"
                value={newTimeline.locationType}
                onChange={event => {
                  setNewTimeline({
                    ...newTimeline,
                    locationType: event.target.value,
                    locationName: event.target.value === "INDOOR" || event.target.value === "OUTDOOR" ? newTimeline.locationName : ""
                  });
                }}
              >
                <MenuItem value={'INDOOR'}>INDOOR</MenuItem>
                <MenuItem value={'OUTDOOR'}>OUTDOOR</MenuItem>
                <MenuItem value={'HOME'}>HOME</MenuItem>
                <MenuItem value={'TRAVELLING'}>TRAVELLING</MenuItem>
              </Select>
            </Tooltip>
            <TextField
              id="outlined-basic"
              label="Location Name"
              variant="outlined"
              sx={{ ml: '24px' }}
              value={newTimeline.locationName}
              onChange={event => {
                setNewTimeline({
                  ...newTimeline,
                  locationName: event.target.value
                });
              }}
              disabled={
                !(
                  newTimeline.locationType === 'INDOOR' ||
                  newTimeline.locationType === 'OUTDOOR'
                )
              }
            />
          </div>
          <Tooltip title={verifyButton() ? 'Please enter location name' : ''}>
            <div className="pt-6 flex">
              <button
                type="button"
                className="w-full bg-yellow disabled:bg-white focus:ring-4 focus:ring-red-300 rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                disabled={verifyButton()}
                onClick={() => onAddNewTimeline()}
              >
                + Add Entry
              </button>
            </div>
          </Tooltip>
        </div>
      </div>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={6000}
        onClose={() => setIsSnackbarOpen(false)}
        message={snackbarMessage}
        action={null}
      />
    </>
  );
};
