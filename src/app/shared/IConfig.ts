export interface ITimeNumber {
  begin: number;
  end: number;
}

export interface IAppointment {
  id: string;
  name: string;
  email: string;
  tel: string;
  reason: string;
  remark: string;
  status: 'activated' | 'done' | 'canceled';
  begin: number;
  end: number;
  interval: number;
  timeZone: string;
  event: string;
}

export interface ITimeString {
  begin: string;
  end: string;
}

interface ITimeStrings {
  [key: string]: ITimeString[];
}

interface IWeekly extends ITimeStrings {
  0: ITimeString[];
  1: ITimeString[];
  2: ITimeString[];
  3: ITimeString[];
  4: ITimeString[];
  5: ITimeString[];
  6: ITimeString[];
}

export interface IEvent {
  id: string;
  displayName: string;
  text: string;
  max: number;
  duration: number;
  interval: number;
  timeZone: string;
  weekly: IWeekly;
  dates: ITimeStrings;
  location: string;
  display: boolean;
}
