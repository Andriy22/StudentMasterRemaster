export class ScheduleModel {
  day: string;
  items: ScheduleItem[] = [];
}

export class ScheduleItem {
  name: string;
  pos: number;
  id: number;
}
