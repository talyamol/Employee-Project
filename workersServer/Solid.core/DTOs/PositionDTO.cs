using Solid.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solid.Core.DTOs
{
    public class PositionDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<EmployeePositionDTO> Employees { get; set; }
        
    }
}
