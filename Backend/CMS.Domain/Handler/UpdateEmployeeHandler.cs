using CMS.Data.Repositories;
using CMS.Messages.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace CMS.Domain.Handler
{
    public class UpdateEmployeeHandler
    {
        private readonly IEmployeeRepository _employeeRepository;

        public UpdateEmployeeHandler(IEmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }

        public string UpdateEmployee(Employee emp)
        {
            return _employeeRepository.UpdateEmployee(emp);
        }
    }
}
