using Microsoft.AspNetCore.Mvc;
using Solid.Core.Entities;
using Solid.Core.Services;
using WorkersServer.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WorkersServer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeePositionController : ControllerBase
    {
        private readonly IEmployeePositionService _employeePositionService;

        public EmployeePositionController(IEmployeePositionService data)
        {
            _employeePositionService = data;
        }


        // GET: api/<EmployeePositionController>
        [HttpGet]
        public async Task<ActionResult<Solid.Core.Entities.EmployeePosition>> Get()
        {
           var list= await _employeePositionService.GetAllEmployeePositionsAsync();
            return Ok(list);
        }
        //לא שיניתי כאן כי הבנתי שלטבלה המקשרת לא צריך קונטרולר וממשקים
        // GET api/<EmployeePositionController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Solid.Core.Entities.EmployeePosition>> Get(int id)
        {
            return await _employeePositionService.GetEmployeePositionByIdAsync(id);
        }

        // POST api/<EmployeePositionController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] Models.EmployeePositionPostModel ep)
        {
            var e = new Solid.Core.Entities.EmployeePosition() { DateEntry = ep.DateEntry, PositionId = ep.PositionId};
            var addNew=await _employeePositionService.AddEmployeePositionAsync(e);
            return Ok(addNew);
        }

        // PUT api/<EmployeePositionController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult<Solid.Core.Entities.EmployeePosition>> Put(int id, [FromBody] Models.EmployeePositionPostModel ep)
        {
            var e = new Solid.Core.Entities.EmployeePosition() { DateEntry = ep.DateEntry, PositionId = ep.PositionId};
            var addNew = await _employeePositionService.UpdateEmployeePositionAsync(id,e);
            return Ok(addNew);

        }

        // DELETE api/<EmployeePositionController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var ep = await _employeePositionService.GetEmployeePositionByIdAsync(id);
            if (ep == null)
                return NotFound();
            await _employeePositionService.DeleteEmployeePositionAsync(id);
            return NoContent();
        }
    }
}
