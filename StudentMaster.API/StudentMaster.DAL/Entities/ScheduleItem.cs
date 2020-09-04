namespace StudentMaster.DAL.Entities
{
    public class ScheduleItem
    {
        public int Id { get; set; }
        public int Position { get; set; }
        public Subject Name { get; set; }
        public Schedule schedule { get; set; }
    }
}
