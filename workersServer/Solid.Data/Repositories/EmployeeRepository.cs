using Microsoft.EntityFrameworkCore;
using Solid.Core.Entities;
using Solid.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solid.Data.Repositories
{
    public class EmployeeRepository : IEmployeeRepository
    {

        private readonly DataContext _context;

        public EmployeeRepository(DataContext dataContext)
        {
            _context = dataContext;
        }

        public async Task<Employee> AddEmployeeAsync(Employee employee)
        {
            _context.EmployeesList.Add(employee);
            await _context.SaveChangesAsync();
            return employee;
        }

        public async Task DeleteEmployeeAsync(int id)
        {
            var e = await GetEmployeeByIdAsync(id);
            //_context.EmployeesList.Remove(e);
            e.Status = false;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteEmployeeByTzAsync(string tz)
        {
            var e = await _context.EmployeesList.FirstOrDefaultAsync(x => x.Tz == tz);
            if (e != null)
                e.Status = false;
            await _context.SaveChangesAsync();
        }

        public async Task<Employee> GetByEmployeeNameAndPassword(string employeeFirstName, string employeeLastName, string employeePassword)
        {
            return await _context.EmployeesList.FirstAsync(e =>
          e.FirstName == employeeFirstName &&
          e.LastName == employeeLastName
      //  e.Password == employeePassword
      );
        }

        public async Task<Employee> GetEmployeeByIdAsync(int id)
        {
            return await _context.EmployeesList.FirstAsync(e => e.Id == id);
        }

        public async Task<Employee> GetEmployeeByTzAsync(string tz)
        {
            return await _context.EmployeesList.FirstAsync(x => x.Tz == tz);
        }


        public async Task<IEnumerable<Employee>> GetEmployeesAsync()
        {
            return await _context.EmployeesList.Include(e => e.EmployeePosition).ToListAsync();
            //
        }


        public async Task<Employee> UpdateEmployeeAsync(Employee employee)
        {
            var existEmployee = await GetEmployeeByTzAsync(employee.Tz);


            if (existEmployee != null)
            {
                var newEmployeeRoles = employee.EmployeePosition;
                _context.EmployeePositionsList.RemoveRange(_context.EmployeePositionsList.Where(er => er.EmployeeId == existEmployee.Id));
                existEmployee.EmployeePosition = newEmployeeRoles;
                existEmployee.FirstName = employee.FirstName;
                existEmployee.LastName = employee.LastName;
                existEmployee.StartDate = employee.StartDate;
                existEmployee.DateBorn = employee.DateBorn;
                existEmployee.Gender = employee.Gender;
              

                await _context.SaveChangesAsync();

                return existEmployee;
            }
            return null;
        }
    }
}

