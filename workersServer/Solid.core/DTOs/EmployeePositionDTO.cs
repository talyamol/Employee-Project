using Solid.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solid.Core.DTOs
{
    public class EmployeePositionDTO
    {

        public int EmployeeId { get; set; }
        //public EmployeeDTO Employee { get; set; }
        public int PositionId { get; set; }
        //public PositionDTO Position { get; set; }

        public DateTime DateEntry { get; set; }

        public bool Management { get; set; }

    }
}
