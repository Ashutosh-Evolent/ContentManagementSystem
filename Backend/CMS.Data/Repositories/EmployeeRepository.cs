using Azure;
using CMS.Data.DbContexts;
using CMS.Messages.Entities;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Mvc;


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
    public class EmployeeRepository : Microsoft.AspNetCore.Mvc.ControllerBase, IEmployeeRepository
    {
        EmployeeDbContext employeeDbContexts;

        public EmployeeRepository(EmployeeDbContext _employeeDbContexts)
        {
            employeeDbContexts = _employeeDbContexts;
        }
        public string AddEmployee(Employee emp)
        {
            string msg = "";
            if (emp.FirstName.Length == 0 && emp.LastName.Length == 0 && emp.ContactNumber.Length == 0 && emp.Email.Length==0)
            {
                return msg = "First name, Last name, Contact number, Email can not be empty";
            }
            else if (emp.FirstName.Length == 0 && emp.LastName.Length == 0 && emp.ContactNumber.Length == 0)
            {
                return msg = "First name, Last name, Contact number can not be empty";
            }
            else if (emp.LastName.Length == 0 && emp.ContactNumber.Length == 0 && emp.Email.Length == 0)
            {
                return msg = "Last name, Contact number, Email can not be empty";
            }
            else if (emp.FirstName.Length == 0 && emp.LastName.Length == 0 && emp.Email.Length == 0)
            {
                return msg = "First name, Last name, Email can not be empty";
            }
            else if (emp.FirstName.Length == 0 && emp.LastName.Length == 0)
            {
                return msg = "First name, Last name can not be empty";
            }
            else if (emp.FirstName.Length == 0 && emp.ContactNumber.Length == 0)
            {
                return msg = "First name, Contact number can not be empty";
            }
            else if (emp.FirstName.Length == 0 && emp.Email.Length == 0)
            {
                return msg = "First name, Email can not be empty";
            }
            else if (emp.LastName.Length == 0 && emp.ContactNumber.Length == 0)
            {
                return msg = "Last name, Contact number can not be empty";
            }
            else if (emp.LastName.Length == 0 && emp.Email.Length == 0)
            {
                return msg = "Last name, Email can not be empty";
            }
            else if (emp.ContactNumber.Length == 0 && emp.Email.Length == 0)
            {
                return msg = "Contact number, Email can not be empty";
            }else if (emp.FirstName.Length == 0)
            {
                return msg = "First name can not be empty";
            }
            else if (emp.FirstName.Length > 30)
            {
                return msg = "First name can not exceed by 30 characters";
            }
            else if (emp.LastName.Length == 0)
            {
                return msg = "Last name can not be empty";
            }
            else if (emp.LastName.Length > 30)
            {
                return msg = "Last name can not exceed by 30 characters";
            }
            else if (emp.ContactNumber.Length == 0)
            {
                return msg = "Contact number can not be empty";
            }
            else if (emp.Email.Length == 0)
            {
                return msg = "Email can not be empty";
            }
            else
            {
                var foundPhoneNumber = employeeDbContexts.Employees.Where(x => x.ContactNumber == emp.ContactNumber).FirstOrDefault();
                var foundEmail = employeeDbContexts.Employees.Where(a => a.Email.ToLower() == emp.Email.ToLower()).FirstOrDefault();
                if (foundPhoneNumber != null && foundEmail != null)
                {
                    return msg = "Phone number and email already exists";
                }
                else if (foundPhoneNumber != null)
                {
                    return msg = "Phone number already exists";
                }
                else if (foundEmail != null)
                {
                    return msg = "Email already exists";
                }
                else
                {
                    employeeDbContexts.Employees.Add(emp);
                    employeeDbContexts.SaveChanges();
                    msg = "Employee added successfully";
                    return msg;
                }

            }

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
