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
    public class PositionRepository : IPositionRepository
    {
        private readonly DataContext _context;

        public PositionRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<Position> AddPositionAsync(Position position)
        {
            _context.PositionsList.Add(position);
            await _context.SaveChangesAsync();
            return position;
        }

        public async Task DeletePositionAsync(int id)
        {
            var p = await GetPositionByIdAsync(id);
            _context.PositionsList.Remove(p);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<Position>> GetAllPositionsAsync()
        {
            return await _context.PositionsList.Include(p=>p.Employees).ToListAsync();
        }

        public async Task<Position> GetPositionByIdAsync(int id)
        {
            return await _context.PositionsList.FirstAsync(p=>p.Id==id);
        }

        public async Task<Position> UpdatePositionAsync( Position position)
        {
            var p = await GetPositionByIdAsync(position.Id);
           _context.Entry(p).CurrentValues.SetValues(position);
            await _context.SaveChangesAsync();
            return p;
        }
    }
}
