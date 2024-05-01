using Solid.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solid.Core.Repositories
{
    public interface IEmployeeRepository
    {
        Task<IEnumerable<Employee>> GetEmployeesAsync();
        Task<Employee> GetEmployeeByIdAsync(int id);
        Task<Employee> GetEmployeeByTzAsync(string tz);

        Task<Employee> AddEmployeeAsync(Employee employee);
        Task<Employee> UpdateEmployeeAsync( Employee employee);
        //Task<Employee> UpdateEmployeeAsync(int id, Employee employee);

        Task DeleteEmployeeAsync(int id);
        //  Task<Employee> GetEmployeeByPasswordAsync(string password, string userName);
        Task DeleteEmployeeByTzAsync(string tz);

        Task<Employee> GetByEmployeeNameAndPassword(string employeeFirstName, string employeeLastName,string employeePassword);

    }
}
