using Solid.Core.Entities;
using Solid.Core.Repositories;
using Solid.Core.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solid.Service
{
    public class EmployeePositionService : IEmployeePositionService
    {
        private readonly IEmployeePositionRepository _employeePositionRepository;

        public EmployeePositionService(IEmployeePositionRepository employeePositionRepository)
        {
            _employeePositionRepository = employeePositionRepository;
        }

        public async Task<EmployeePosition> AddEmployeePositionAsync(EmployeePosition position)
        {
            return await _employeePositionRepository.AddEmployeePositionAsync(position);
        }

        public async Task DeleteEmployeePositionAsync(int id)
        {
            await _employeePositionRepository.DeleteEmployeePositionAsync(id);
        }

        public async Task<IEnumerable<EmployeePosition>> GetAllEmployeePositionsAsync()
        {
            return await _employeePositionRepository.GetAllEmployeePositionsAsync();
        }

        public async Task<EmployeePosition> GetEmployeePositionByIdAsync(int id)
        {
            return await _employeePositionRepository.GetEmployeePositionByIdAsync(id);
        }

        public async Task<EmployeePosition> UpdateEmployeePositionAsync(int id, EmployeePosition position)
        {
            return await _employeePositionRepository.UpdateEmployeePositionAsync(id, position);
        }
    }
}
