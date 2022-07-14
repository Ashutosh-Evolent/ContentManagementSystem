using CMS.Domain.Handler;
using CMS.Messages.Entities;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Identifi.Essentials.Web;
using CMS.Messages.Requests;
using Identifi.Infrastructure.RequestPipeline;

namespace CMS.Web.Controllers
{
    [Route("Employee")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        CreateEmployeeHandler createEmployeeHandler;
        DeleteEmployeeHandler deleteEmployeeHandler;
        GetEmployeeHandler getEmployeeHandler;
        UpdateEmployeeHandler updateEmployeeHandler;
        GetEmployeeByIdHandler getEmployeeByIdHandler;

        public EmployeeController(CreateEmployeeHandler _createEmployeeHandler,
        DeleteEmployeeHandler _deleteEmployeeHandler,
        GetEmployeeHandler _getEmployeeHandler,
        UpdateEmployeeHandler _updateEmployeeHandler,
        GetEmployeeByIdHandler _getEmployeeByIdHandler)
        {
            createEmployeeHandler = _createEmployeeHandler;
            deleteEmployeeHandler = _deleteEmployeeHandler;
            getEmployeeHandler = _getEmployeeHandler;
            updateEmployeeHandler = _updateEmployeeHandler;
            getEmployeeByIdHandler = _getEmployeeByIdHandler;
        }

        [HttpGet("EmployeeList")]
        public IActionResult GetEmployee()
        {
            //return await ProcessAsync(request);
            return Ok(getEmployeeHandler.EmployeeList());
  
        }

        [HttpGet("GetEmployee/{empID:int}")]
        public IActionResult GetEmployeeById(int empID)
        {
            return Ok(getEmployeeByIdHandler.GetEmployee(empID));

        }

        [HttpPost("AddEmployee")]
        public IActionResult CreateEmployee(Employee emp)
        {
            //return Ok(createEmployeeHandler.AddEmployee(emp));
            
            if (createEmployeeHandler.AddEmployee(emp).Equals("Employee added successfully"))
            {
                return Ok("Employee added successfully");
            }
            else
            {

                return BadRequest(createEmployeeHandler.AddEmployee(emp));
            }
        }

        [HttpPut("Update")]
        public IActionResult UpdateEmployee(Employee emp)
        {
            return Ok(updateEmployeeHandler.UpdateEmployee(emp));
        }

        [HttpDelete("Delete/{empID:int}")]
        public IActionResult DeleteEmployee(int empID)
        {
            return Ok(deleteEmployeeHandler.DeleteEmployee(empID));
        }
    }
}
