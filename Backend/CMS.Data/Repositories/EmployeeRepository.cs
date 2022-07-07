using CMS.Data.DbContexts;
using CMS.Messages.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CMS.Data.Repositories
{
    public interface IEmployeeRepository
    {
        string AddEmployee(Employee emp);       
        string DeleteEmployee(int employeeID);
        object EmployeeList();
        string UpdateEmployee(Employee emp);
        object GetEmployeeById(int employeeID);
    }
    public class EmployeeRepository : IEmployeeRepository
    {
        EmployeeDbContext employeeDbContexts;

        public EmployeeRepository(EmployeeDbContext _employeeDbContexts)
        {
            employeeDbContexts = _employeeDbContexts;
        }
        public string AddEmployee(Employee emp)
        {
            string msg = "";
            employeeDbContexts.Employees.Add(emp);
            employeeDbContexts.SaveChanges();
            msg = "Employee added successfully";
            return msg;
        }

        public string DeleteEmployee(int employeeID)
        {
            string msg = "employee not found";
            var emp = employeeDbContexts.Employees.Find(employeeID);
            if (emp == null)
                return msg;
            employeeDbContexts.Employees.Remove(emp);
            employeeDbContexts.SaveChanges();
            msg = "employee deleted successfully";
            return msg;
        }

        public object EmployeeList()
        {
            List<Employee> list = employeeDbContexts.Employees.ToList();
            return list;
        }

        public string UpdateEmployee(Employee emp)
        {
            string msg = "";
            employeeDbContexts.Employees.Update(emp);
            employeeDbContexts.SaveChanges();
            msg = "Employee updated successfully";
            return msg;
        }

        public object GetEmployeeById(int employeeID)
        {
            string msg = "employee not found";
            var emp = employeeDbContexts.Employees.Find(employeeID);
            if (emp == null)
                return msg;
            return emp;
        }
    }
}
