using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solid.Core.Entities
{
    public class EmployeePosition
    {
        public int EmployeePositionId { get; set; }
        public int EmployeeId { get; set; }
        //public Employee Employee { get; set; }
        public int PositionId { get; set; }
        //public Position Position { get; set; }
      
        public DateTime DateEntry { get; set; }

        public bool Management { get; set; }



    }
}
