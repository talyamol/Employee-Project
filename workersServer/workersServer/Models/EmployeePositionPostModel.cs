namespace WorkersServer.Models
{
    public class EmployeePositionPostModel
    {
        public DateTime DateEntry { get; set; }
       //public int EmployeeId { get; set; }
        public int PositionId { get; set; }
        public bool Management { get; set; }

    }
}
