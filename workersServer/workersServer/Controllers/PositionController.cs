using AutoMapper;
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
    public class PositionController : ControllerBase
    {

        private readonly IPositionService _positionService;
        private readonly IMapper _mapper;

        public PositionController(IPositionService data,IMapper mapper)
        {
            _positionService = data;
            _mapper = mapper;
        }


        // GET: api/<PositionController>
        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var list = await _positionService.GetAllPositionsAsync();
            return Ok(_mapper.Map<IEnumerable<PositionDTO>>(list));
        }

        // GET api/<PositionController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult> Get(int id)
        {
            var position= await _positionService.GetPositionByIdAsync(id);
            return Ok(_mapper.Map<IEnumerable<PositionDTO>>(position));
        }

        // POST api/<PositionController>
        [HttpPost]
        public async Task<ActionResult> Post([FromBody] PositionPostModel p)
        {
            var newPosition = await _positionService.AddPositionAsync(_mapper.Map<Position>(p));
            return Ok(_mapper.Map<PositionDTO>(newPosition));
        }

        // PUT api/<PositionController>/5
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] PositionDTO p)
        {
            var position= await _positionService.GetPositionByIdAsync(id);
            if (position is null)
            {
                return NotFound();
            }
            _mapper.Map(p, position);
            await _positionService.UpdatePositionAsync(position);
            position=await _positionService.GetPositionByIdAsync(id);
            return Ok(_mapper.Map<PositionDTO>(position));

        }


        // DELETE api/<PositionController>/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var position = await _positionService.GetPositionByIdAsync(id);
            if (position is null)
            {
                return NotFound();
            }
            await _positionService.DeletePositionAsync(id);
            return NoContent();
        }
    }
}
