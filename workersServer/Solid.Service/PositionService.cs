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
    public class PositionService : IPositionService
    {
        private readonly IPositionRepository _positionRepository;

        public PositionService(IPositionRepository positionRepository)
        {
            _positionRepository = positionRepository;
        }

        public async Task<Position> AddPositionAsync(Position position)
        {
            return await _positionRepository.AddPositionAsync(position);
        }

        public async Task DeletePositionAsync(int id)
        {
          await _positionRepository.DeletePositionAsync(id);
        }

        public async Task<IEnumerable<Position>> GetAllPositionsAsync()
        {
            return await _positionRepository.GetAllPositionsAsync();
        }

        public async Task<Position> GetPositionByIdAsync(int id)
        {
            return await _positionRepository.GetPositionByIdAsync(id);
        }

        public async Task<Position> UpdatePositionAsync( Position position)
        {
            return await _positionRepository.UpdatePositionAsync(position);
        }
    }
}
