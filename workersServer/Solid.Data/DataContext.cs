using Microsoft.EntityFrameworkCore;
using Solid.Core.DTOs;
using Solid.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Solid.Data
{
    public class DataContext:DbContext
    {
        public DbSet<Employee> EmployeesList { get; set; }
        public DbSet<Position> PositionsList { get; set; }
        public DbSet<EmployeePosition> EmployeePositionsList { get; set; }
        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    modelBuilder.Entity<EmployeePosition>()
        //        .HasKey(pe => new { pe.EmployeeId, pe.PositionId });
        //}
   
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=(localdb)\\MSSQLLocalDB;Database=Employees_db");
        }
     
    }
}
