using Solid.Core.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solid.Core.Entities
{
 
    public class Position
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public IEnumerable<EmployeePosition> Employees { get; set; }
        


    }
}
