using CMS.Data.Repositories;
using System;
using System.Collections.Generic;
using System.Text;

namespace CMS.Domain.Handler
{
    public class GetEmployeeByIdHandler
    {
        private readonly IEmployeeRepository _employeeRepository;

        public GetEmployeeByIdHandler(IEmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }

        public object GetEmployee(int empID)
        {
            return _employeeRepository.GetEmployeeById(empID);
        }
    }
}
