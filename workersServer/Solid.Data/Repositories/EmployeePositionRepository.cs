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
    public class EmployeePositionRepository : IEmployeePositionRepository
    {

        private readonly DataContext _context;

        public EmployeePositionRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<EmployeePosition> AddEmployeePositionAsync(EmployeePosition position)
        {
           _context.EmployeePositionsList.Add(position);
           await _context.SaveChangesAsync();
            return position;
        }

        public async Task DeleteEmployeePositionAsync(int id)
        {
           var e= await GetEmployeePositionByIdAsync(id);
             _context.EmployeePositionsList.Remove(e);
            await _context.SaveChangesAsync();
        }

        public async Task<IEnumerable<EmployeePosition>> GetAllEmployeePositionsAsync()
        {
            return await _context.EmployeePositionsList.ToListAsync();
        }
        //אני לא משתמשת בממשק הזה
        public async Task<EmployeePosition> GetEmployeePositionByIdAsync(int id)
        {
            return await _context.EmployeePositionsList.FirstOrDefaultAsync(x=>x.EmployeeId==id);
        }

        public async Task<EmployeePosition> UpdateEmployeePositionAsync(int id, EmployeePosition position)
        {
            var e = await GetEmployeePositionByIdAsync(id);
            if(e != null)
            {
                e.EmployeeId=position.EmployeeId;
                e.PositionId=position.PositionId;
                e.DateEntry=position.DateEntry;
                await _context.SaveChangesAsync();
            }
            return e;

        }
    }
}
