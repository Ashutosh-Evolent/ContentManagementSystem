using CMS.Data.Repositories;
using CMS.Messages.Dtos;
using CMS.Messages.Requests;
using Identifi.Infrastructure.RequestPipeline;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace CMS.Domain.Handler
{
    public class GetEmployeeHandler
    {
        private readonly IEmployeeRepository _employeeRepository;

        public GetEmployeeHandler(IEmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }

        public object EmployeeList()
        {
            return _employeeRepository.EmployeeList();
        }

    }
}
