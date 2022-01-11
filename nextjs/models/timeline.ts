export interface Timeline {
  id: string;
  patientId: string;
  fromDate: Date;
  toDate: Date;
  detail: string;
  locationType: string;
  locationName: string;
}
