using CMS.Domain.Handler;
using CMS.Data.DbContexts;
using CMS.Data.Repositories;
using CMS.Messages.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using NUnit.Framework.Internal;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Text;

namespace CMS.Domain.Handler.Tests
{
    [TestClass()]
    public class GetEmployeeHandlerTests
    {
        EmployeeDbContext employeeDbContexts;
        [TestMethod()]
        public void GetEmployeeHandlerTest()
        {
            List<Employee> list = employeeDbContexts.Employees.ToList();
            int cnt = list.Count();

            //Assert
            Assert.Equals(3, cnt);
        }

        [TestMethod()]
        public void EmployeeListTest()
        {
            List<Employee> list = employeeDbContexts.Employees.ToList();
            int cnt = list.Count();

            //Assert
            Assert.Equals(3, cnt);
        }
    }
}

/*namespace CMS.Test.Handler
{
    [TestClass]
    public class GetEmployeeHandlerTests : DbContext
    {
         EmployeeRepository _employeeRepository;
        EmployeeDbContext employeeDbContexts;

        [TestMethod]
        public void Task_GetEmployee()
        {
            //Act
            List<Employee> list = employeeDbContexts.Employees.ToList();
            int cnt = list.Count();

            //Assert
            Assert.Equals(3, cnt);
        }
    }
}*/
