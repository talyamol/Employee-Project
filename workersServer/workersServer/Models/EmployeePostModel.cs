using Solid.Core.Entities;

namespace WorkersServer.Models
{
    public class EmployeePostModel
    {
      // public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Tz { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime DateBorn { get; set; }
       public Gender Gender { get; set; }
        public List<EmployeePositionPostModel> EmployeePosition { get; set; }
   
        // public bool Status { get; set; }
        //public string Password { get; set; }
    }
}
