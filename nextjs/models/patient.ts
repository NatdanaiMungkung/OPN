import { Timeline } from "./timeline";

export type Gender = "MALE" | "FEMALE"
export interface Patient {
  id: string
  timelines: Timeline[]
  gender: Gender
  age: number
  occupation: string
}