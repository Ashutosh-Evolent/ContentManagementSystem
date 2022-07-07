using CMS.Data.Repositories;
using CMS.Messages.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Mvc;

namespace CMS.Domain.Handler
{
    public class CreateEmployeeHandler
    {
        private readonly IEmployeeRepository _employeeRepository;

        public CreateEmployeeHandler(IEmployeeRepository employeeRepository)
        {
            _employeeRepository = employeeRepository;
        }

        public string AddEmployee(Employee emp)
        {
            return _employeeRepository.AddEmployee(emp);
        }
    }
}
