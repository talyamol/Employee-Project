using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Solid.Core.DTOs;
using Solid.Core.Entities;
using Solid.Core.Services;
using WorkersServer.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WorkersServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //  [Authorize]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;
        private readonly IMapper _mapper;
        public EmployeeController(IEmployeeService data, IMapper mapper)
        {
            _employeeService = data;
            _mapper = mapper;
        }



        // GET: api/<EmployeeController>
        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var list = await _employeeService.GetEmployeesAsync();
            return Ok(_mapper.Map<IEnumerable<EmployeeDTO>>(list));
        }

        // GET api/<EmployeeController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> Get(int id)
        {
            var employee = await _employeeService.GetEmployeeByIdAsync(id);
            return Ok(_mapper.Map<EmployeeDTO>(employee));
        }



        // POST api/<EmployeeController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] EmployeePostModel e)
        {
            var newEmployee = await _employeeService.AddEmployeeAsync(_mapper.Map<Employee>(e));
            return Ok(_mapper.Map<EmployeeDTO>(newEmployee));
        }

        // PUT api/<EmployeeController>/5
        [HttpPut("{tz}")]
        public async Task<ActionResult> Put([FromBody] EmployeePostModel e)
        {
            var employee = await _employeeService.GetEmployeeByTzAsync(e.Tz);
            if (employee is null)
            {
                return NotFound();
            }

            await _employeeService.UpdateEmployeeAsync(_mapper.Map(e, employee) );

            employee = await _employeeService.GetEmployeeByTzAsync(e.Tz);
            return Ok(_mapper.Map<EmployeeDTO>(employee));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var employee = await _employeeService.GetEmployeeByIdAsync(id);
            if (employee is null)
            {
                return NotFound();
            }
            await _employeeService.DeleteEmployeeAsync(id);
            return NoContent();
        }





    }
}
