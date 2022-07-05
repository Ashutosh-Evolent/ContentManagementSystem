using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using CMS.Messages;
using CMS.Messages.Entities;
using Identifi.Infrastructure.Data;

namespace CMS.Data.DbContexts
{
    //[ConnectionString(Name = DBConnectionStrings.EMPLOYEE)]
    public class EmployeeDbContext:DbContext
    //public class EmployeeDbContext: BaseDbContext<EmployeeDbContext>
    {
        /*public EmployeeDbContext(DbContextOptions<EmployeeDbContext> options, IServiceProvider serviceProvider)
            : base(options, serviceProvider)
        {
        }*/
        public EmployeeDbContext(DbContextOptions<EmployeeDbContext> options) : base(options)
        {

        }
        public DbSet<Employee> Employees { get; set; }
    }
}
