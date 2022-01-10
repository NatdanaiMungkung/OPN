import { DateTimePicker, Timeline, TimelineConnector, TimelineContent, TimelineDot, TimelineItem, TimelineOppositeContent, TimelineSeparator, TimePicker } from "@mui/lab";
import { MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";
import { Patient } from "../models/patient";
import { Timeline as TimelineModel } from '../models/timeline';

interface PatientDetailProp {
  patient: Patient
  hidden: boolean
  onDeletePatient: (id: string) => void
}

export const PatientDetail = ({
  patient,
  onDeletePatient,
  hidden,
}: PatientDetailProp) => {
  const [newTimeline, setNewTimeline] = useState<TimelineModel>({} as TimelineModel);
  console.log('this patient', patient)
  if (hidden || !patient) return null;
  const locations = patient.timelines
  .filter(timeline => !!timeline.locationName && timeline.locationName != '')
  .map(timeline => timeline.locationName);
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
            onClick={()=> onDeletePatient(patient.id)}
          >
            Remove Patient
          </button>
        </div>
        <div className="border-2 rounded-sm border-light-blue py-6 flex bg-light-blue">
          <div className="px-4">
            <Select label="Gender" value={patient.gender} onChange={() => {}}>
              <MenuItem value={'Male'}>Male</MenuItem>
              <MenuItem value={'Female'}>Female</MenuItem>
            </Select>
          </div>
          <div className="px-4">
            <TextField type={"number"} label="Age" variant="standard" value={patient.age} />
          </div>
          <div className="px-4 w-3/5">
            <TextField
              label="Occupation"
              variant="standard"
              fullWidth
              color="primary"
              value={patient.occupation}
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
        <div className="flex flex-col mb-6 w-full lg:w-3/5 border rounded-sm border-yellow py-6 bg-light-blue">
          <div className="bg-yellow rounded-full w-2/5 ml-auto mr-auto">
            <div className="text-center text-xs">{patient.gender}</div>
            <div className="text-center">{patient.age} years old</div>
            <div className="text-center text-xs">{patient.occupation}</div>
          </div>
          <div>
            <Timeline position="right">
              <TimelineItem>
                <TimelineOppositeContent>09:30 am</TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot className="bg-yellow" />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent sx={{ flexBasis: '100%' }}>
                  <div className="bg-lighter-blue flex justify-between rounded p-2 w-full">
                    <div className="text-xs w-1/6 md:whitespace-nowrap text-yellow">
                      16:00 - 23:00
                    </div>
                    <div className="flex flex-col ml-6 w-4/6 text-white">
                      <div>Watch movie until late</div>
                      <div>Home</div>
                    </div>
                    <div className="text-right text-xs hover:cursor-pointer">
                      X
                    </div>
                  </div>
                </TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineOppositeContent>10:30 am</TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot className="bg-yellow" />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent sx={{ flexBasis: '100%' }}>
                  Code
                </TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineOppositeContent>11:30 am</TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot className="bg-yellow" />
                  <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent>Sleep</TimelineContent>
              </TimelineItem>
              <TimelineItem>
                <TimelineOppositeContent color="text.secondary">
                  12:30 am
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot className="bg-yellow" />
                </TimelineSeparator>
                <TimelineContent>Repeat</TimelineContent>
              </TimelineItem>
            </Timeline>
            <div className="mt-6 ml-6 text-lg text-yellow font-bold tracking-wider">
              Visited Places
            </div>
            <div className="flex mx-4">
              {locations.map(location => <div className="mx-2 text-white">{location}</div>)}
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full lg:w-2/5 ml-0 mb-6 lg:ml-5 p-4 border-2 rounded-sm border-light-blue bg-light-blue self-start">
          <div className="flex">
            <div className="text-white w-3/5">
              <DateTimePicker
                renderInput={properties => <TextField {...properties} />}
                label="From"
                value={newTimeline.fromDate}
                onChange={newValue => {
                  // setFromDate(newValue);
                }}
                // color="secondary"
              />
            </div>
            <div className="pl-6 w-2/5">
              <TimePicker
                label="To"
                value={newTimeline.toDate}
                onChange={newValue => {
                  // setToTime(newValue);
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
              />
            </div>
          </div>
          <div className="flex pt-6 w-full">
            <Select label="Location Type" value={newTimeline.locationType} onChange={() => {}}>
              <MenuItem value={10}>INDOOR</MenuItem>
              <MenuItem value={20}>OUTDOOR</MenuItem>
              <MenuItem value={30}>HOME</MenuItem>
              <MenuItem value={30}>TRAVELLING</MenuItem>
            </Select>
            <TextField
              id="outlined-basic"
              label="Location Name"
              variant="outlined"
              sx={{ ml: '24px' }}
              value={newTimeline.locationName}
            />
          </div>
          <div className="pt-6 flex">
            <button
              type="button"
              className="w-full bg-yellow focus:ring-4 focus:ring-red-300 rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              + Add Entry
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
