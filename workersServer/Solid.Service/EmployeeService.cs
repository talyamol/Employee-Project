using Solid.Core.Entities;
using Solid.Core.Repositories;
using Solid.Core.Services;
using Solid.Data.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solid.Service
{
    public class EmployeeService:IEmployeeService
    {
        private readonly IEmployeeRepository _employeeRepository;
       

        public EmployeeService(IEmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }

        public async Task<IEnumerable<Employee>> GetEmployeesAsync()
        {
          return await _employeeRepository.GetEmployeesAsync();
        }

        public async Task<Employee> GetEmployeeByIdAsync(int id)
        {
           return await _employeeRepository.GetEmployeeByIdAsync(id);
        }

        public async Task<Employee> AddEmployeeAsync(Employee employee)
        {
            if (employee.StartDate < employee.DateBorn)
            {
                throw new ArgumentException("Date of start work cannot be before date of birth.");
            }

            if (employee.EmployeePosition != null)
            {
                foreach (var p in employee.EmployeePosition)
                {
                    if (p.DateEntry < employee.StartDate)
                    {
                        throw new ArgumentException("Date of position entry cannot be before date of started work.");
                    }
                }
            }
            if (employee.Tz.Length != 9)
                throw new ArgumentException("Employee ID must contain exactly 9 digits.");
            //var e= GetEmployeeByTzAsync(employee.Tz);
            //if (e is not null)
            //{
            //    throw new ArgumentException("This employee exists");
            //}
            return await _employeeRepository.AddEmployeeAsync(employee);
        }

        //public async Task<Employee> UpdateEmployeeAsync(int id, Employee employee)
        //{
        //    return await _employeeRepository.UpdateEmployeeAsync(id, employee);
        //}
        public async Task<Employee> UpdateEmployeeAsync( Employee employee)
        {
            //if (employee.StartDate < employee.DateBorn)
            //{
            //    throw new ArgumentException("Date of starting work cannot be before date of birth.");
            //}

            //if (employee.EmployeePosition != null)
            //{
            //    foreach (var role in employee.EmployeePosition)
            //    {
            //        if (role.DateEntry > employee.StartDate)
            //        {
            //            throw new ArgumentException("Date of role entry cannot be before date of starting work.");
            //        }
            //    }
            //}
            return await _employeeRepository.UpdateEmployeeAsync( employee);
        }

        public async Task DeleteEmployeeAsync(int id)
        {
             await _employeeRepository.DeleteEmployeeAsync(id);
        }

        //public async Task<Employee> GetEmployeeByPasswordAsync(string password, string userName)
        //{
        //    var employees = await GetEmployeesAsync();
        //    var employee = employees.FirstOrDefault(e => e.Password == password && e.UserName == userName);
        //    return employee;
        //}

        public async Task<Employee> GetByEmployeeNameAndPassword(string employeeFirstName, string employeeLastName, string employeePassword)
        {
            return await _employeeRepository.GetByEmployeeNameAndPassword(employeeFirstName, employeeLastName, employeePassword);
        }

        public async Task DeleteEmployeeByTzAsync(string tz)
        {
            await _employeeRepository.DeleteEmployeeByTzAsync(tz);
        }

        public async Task<Employee> GetEmployeeByTzAsync(string tz)
        {
            return await _employeeRepository.GetEmployeeByTzAsync( tz);
        }

       
    }
}
