using CMS.Data.Repositories;
using System;
using System.Collections.Generic;
using System.Text;

namespace CMS.Domain.Handler
{
    public class DeleteEmployeeHandler
    {
        private readonly IEmployeeRepository _employeeRepository;

        public DeleteEmployeeHandler(IEmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }

        public string DeleteEmployee(int empID)
        {
            return _employeeRepository.DeleteEmployee(empID);
        }
    }
}
