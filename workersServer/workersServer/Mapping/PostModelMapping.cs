using AutoMapper;
using Solid.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WorkersServer.Models;

namespace WorkersServer.Mapping
{
    public class PostModelMapping : Profile
    {
        public PostModelMapping()
        {
            CreateMap<PositionPostModel, Position>().ReverseMap();
            CreateMap<EmployeePostModel, Employee>().ReverseMap();
            CreateMap<EmployeePositionPostModel, EmployeePosition>().ReverseMap();
        }
    }
}
