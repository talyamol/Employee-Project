using Solid.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solid.Core.Services
{
    public interface IEmployeePositionService
    {
        Task<IEnumerable<EmployeePosition>> GetAllEmployeePositionsAsync();
        Task<EmployeePosition> GetEmployeePositionByIdAsync(int id);
        Task<EmployeePosition> AddEmployeePositionAsync(EmployeePosition position);
        Task<EmployeePosition> UpdateEmployeePositionAsync(int id, EmployeePosition position);
        Task DeleteEmployeePositionAsync(int id);
    }
}
