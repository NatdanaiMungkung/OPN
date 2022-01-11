import {
  Timeline,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent
} from '@mui/lab';
import dayjs from 'dayjs';
import { Patient } from '../models/patient';
import { Timeline as TimelineModel } from '../models/timeline';

export const TimelineDetail = ({
  patient,
  onRemoveTimeline
}: {
  patient: Patient;
  onRemoveTimeline: (date: string) => void;
}) => {
  const locations = {};
  patient.timelines
    .filter(timeline => !!timeline.locationName && timeline.locationName != '')
    .forEach(timeline => (locations[timeline.locationName] = true));
  const { timelines } = patient;
  const sortedTimeline = timelines.sort(
    (a, b) => dayjs(a.fromDate).unix() - dayjs(b.fromDate).unix()
  );
  let startDate = '2000-01-01';
  const sortedTimelineByDate: TimelineModel[][] = [] as TimelineModel[][];
  let tempArr = [];
  sortedTimeline.forEach(timeline => {
    if (dayjs(timeline.fromDate).format('YYYY-MM-DD') !== startDate) {
      startDate = dayjs(timeline.fromDate).format('YYYY-MM-DD');
      if (tempArr.length === 0) tempArr.push(timeline);
      else {
        sortedTimelineByDate.push([...tempArr]);
        tempArr = [timeline];
      }
    } else {
      tempArr.push(timeline);
    }
  });
  sortedTimelineByDate.push([...tempArr]);
  return (
    <div className="flex flex-col mb-6 w-full lg:w-3/5 border rounded-sm border-yellow py-6 bg-light-blue">
      <div className="bg-yellow rounded-full w-2/5 ml-auto mr-auto">
        <div className="text-center text-xs">{patient.gender}</div>
        <div className="text-center">{patient.age} years old</div>
        <div className="text-center text-xs">{patient.occupation}</div>
      </div>
      <div>
        <Timeline position="right">
          {sortedTimelineByDate.map(date => (
            <TimelineItem>
              {date.length > 0 && (<>
              <TimelineOppositeContent>
                <div className="text-xs text-yellow">
                  {dayjs(date[0].fromDate).format('DD/MM/YYYY')}
                </div>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot className="bg-yellow" />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent sx={{ flexBasis: '100%' }}>
                <div className="bg-lighter-blue flex flex-col justify-between rounded p-2 w-full">
                  {date.map((timeline, index) => (
                    <div className="flex pt-2 pb-2 items-center">
                      <div className="text-xs w-1/6 md:whitespace-nowrap text-yellow">
                        {dayjs(timeline.fromDate).format('HH:mm')} -{' '}
                        {dayjs(timeline.toDate).format('HH:mm')}
                      </div>
                      <div className="flex flex-col ml-6 w-4/6 text-white">
                        <div>{timeline.detail}</div>
                        <div className="text-yellow text-xs">
                          {timeline.locationType}
                          {timeline.locationName === '' ||
                          timeline.locationName === 'undefined'
                            ? null
                            : ` - ${timeline.locationName}`}
                        </div>
                      </div>
                      <div
                        className="text-right text-xs hover:cursor-pointer hover:text-white self-start"
                        onClick={() =>
                          onRemoveTimeline(
                            dayjs(timeline.fromDate).format('YYYY-MM-DD')
                          )
                        }
                      >
                        {index === 0 ? 'X' : null}
                      </div>
                    </div>
                  ))}
                </div>
              </TimelineContent>
              </>)}
            </TimelineItem>
          ))}
        </Timeline>
        <div className="mt-6 ml-6 text-lg text-yellow font-bold tracking-wider">
          Visited Places
        </div>
        <div className="flex mx-4">
          {Object.keys(locations).map(location => (
            <div className="mx-2 text-white">{location}</div>
          ))}
        </div>
      </div>
    </div>
  );
};
