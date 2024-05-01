using Solid.Core.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Solid.Core.Entities
{
    public enum Gender
    {
        Female,
        Male
    }
    public class Employee
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Tz { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime DateBorn { get; set;}
        public Gender Gender { get; set; }
        public List<EmployeePosition> EmployeePosition { get; set; } 
        public bool Status { get; set; } = true;
       // public string Password { get; set; }
      
    }
}
