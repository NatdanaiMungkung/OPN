import * as React from 'react';
import { BsPlusCircleFill } from 'react-icons/bs'
import AdapterDayjs from '@mui/lab/AdapterDayjs';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';
import TextField from '@mui/material/TextField';
import TimePicker from '@mui/lab/TimePicker';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import { styled } from '@mui/system';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { getPatients } from '../api/patientApi'

const TextFieldStyled = styled(TextField)({
  color: 'white'
});

export default function Index({ patients }) {
  console.log('patients', patients);
  const [fromDate, setFromDate] = React.useState(null);
  const [toTime, setToTime] = React.useState(null);
  const [patientIndex, setPatientIndex] = React.useState(0);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <div className="font-fancy">
      <div className="mt-6 flex justify-center sm:text-xl md:text-4xl  text-yellow font-bold tracking-wider">Covid Timeline Generator</div>

      <div className="mt-6 flex ml-auto mr-auto sm:w-full md:w-3/5 bg-light-blue rounded">
        <Tabs value={patientIndex} onChange={(i)=> setPatientIndex(i)} aria-label="basic tabs example">
            {patients.map((patient,i) => (
              <Tab label={<div className='flex flex-col'><span>Patient</span><span>{i + 1}</span></div>}  />
            ))}
          </Tabs>
        <div className='mt-4 ml-4 text-lighter-blue hover:text-white hover:cursor-pointer'><BsPlusCircleFill size={'24px'} /></div>
      </div>
      <div className="mt-6 px-4 md:px-0 ml-auto mr-auto sm:w-full md:w-3/5">
        <div className="flex justify-between">
          <div className="mt-6 flex justify-center text-2xl text-yellow font-bold tracking-wider">Patient Information</div>
          <button type="button" className="mt-6 text-white bg-red focus:ring-4 focus:ring-red-300 rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Remove Patient</button>
        </div>
        <div className="border-2 rounded-sm border-light-blue py-6 flex bg-light-blue">
          <div className="px-4">
          <Select
          label="Gender"
          value={10}
          onChange={() => {}}
        >
          <MenuItem value={'10'}>Male</MenuItem>
          <MenuItem value={20}>Female</MenuItem>
        </Select>
          </div>
          <div className="px-4">
            <TextFieldStyled label="Age" variant="standard" />
          </div>
          <div className="px-4 w-3/5">
          <TextField label="Occupation" variant="standard" fullWidth color="primary" />
          </div>
        
        </div>
      </div>
      <div className="mt-6 ml-auto mr-auto px-4 md:px-0 w-full md:w-3/5">
        <div className="flex justify-left">
          <div className="mt-6 flex justify-center text-2xl text-yellow font-bold tracking-wider">Timeline</div>
        </div>
      </div>
      <div className="mt-6 ml-auto mr-auto w-full lg:w-3/5 flex px-4 md:px-0 flex-col-reverse lg:flex-row">
        <div className="flex flex-col mb-6 w-full lg:w-3/5 border rounded-sm border-yellow py-6 bg-light-blue">
          <div className="bg-yellow rounded-full w-2/5 ml-auto mr-auto">
            <div className="text-center text-xs">Female</div>
            <div className="text-center">32 years old</div>
            <div className="text-center text-xs">Software Engineer</div>
          </div>
          <div>
          <Timeline position="right">
      <TimelineItem>
      <TimelineOppositeContent>
            09:30 am
          </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot className="bg-yellow"/>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent sx={{flexBasis: '100%'}}>
          <div className='bg-lighter-blue flex justify-between rounded p-2 w-full'>
            <div className='text-xs w-1/6 md:whitespace-nowrap'>16:00 - 23:00</div>
            <div className='flex flex-col ml-6 w-4/6'>
              <div>Watch movie until late</div>
              <div>Home</div>
            </div>
            <div className='text-right text-xs hover:cursor-pointer'>X</div>
          </div>
          </TimelineContent>
      </TimelineItem>
      <TimelineItem>
      <TimelineOppositeContent>
            10:30 am
          </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot className="bg-yellow" />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent  sx={{flexBasis: '100%'}}>Code</TimelineContent>
      </TimelineItem>
      <TimelineItem>
      <TimelineOppositeContent>
            11:30 am
          </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot className="bg-yellow"/>
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>Sleep</TimelineContent>
      </TimelineItem>
      <TimelineItem>
      <TimelineOppositeContent color="text.secondary">
            12:30 am
          </TimelineOppositeContent>
        <TimelineSeparator>
          <TimelineDot className="bg-yellow"/>
        </TimelineSeparator>
        <TimelineContent>Repeat</TimelineContent>
      </TimelineItem>
    </Timeline>
    <div className="mt-6 ml-6 text-lg text-yellow font-bold tracking-wider">Visited Places</div>
    <div className='flex mx-4'>
      <div className='mx-2'>Central Rama 2</div>
      <div className='mx-2'>Central Rama 2</div>
      <div className='mx-2'>Central Rama 2</div>
    </div>
          </div>
        </div>
        <div className="flex flex-col w-full lg:w-2/5 ml-0 mb-6 lg:ml-5 p-4 border-2 rounded-sm border-light-blue bg-light-blue self-start">
          <div className='flex'>
          <div className='text-white w-3/5'>
                        <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label="From"
                value={fromDate}
                onChange={(newValue) => {
                  setFromDate(newValue);
                }}
                
                color="secondary"
              />
                        </div>
                      <div className='pl-6 w-2/5'>
                      <TimePicker
                    label="To"
                    value={toTime}
                    onChange={(newValue) => {
                      setToTime(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                  />
                        </div>
            </div>
          <div className='flex'><div className='pt-6 w-full'><TextField
          label="Detail"
          multiline
          rows={4}
          sx={{width: '100%'}}
          
        /></div></div>
        <div className='flex pt-6 w-full'>
        <Select
          label="Location Type"
          onChange={() => {}}
          
        >
          <MenuItem value={10}>INDOOR</MenuItem>
          <MenuItem value={20}>OUTDOOR</MenuItem>
          <MenuItem value={30}>HOME</MenuItem>
          <MenuItem value={30}>TRAVELLING</MenuItem>
        </Select>
        <TextField id="outlined-basic" label="Location Name" variant="outlined" sx={{ml: '24px'}}  />
        </div>
        <div className='pt-6 flex'>
        <button type="button" className="w-full bg-yellow focus:ring-4 focus:ring-red-300 rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">+ Add Entry</button>
        </div>
        </div>
      </div>
    </div>
    </LocalizationProvider>
  );
}


export async function getStaticProps() {
  const patients = await getPatients();
  return {
    props: {
      patients: patients.data.data.patients
    }
  }
}