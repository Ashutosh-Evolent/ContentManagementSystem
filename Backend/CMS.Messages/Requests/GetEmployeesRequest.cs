using CMS.Messages.Dtos;
using Identifi.Infrastructure.RequestPipeline;
using System;
using System.Collections.Generic;
using System.Text;

namespace CMS.Messages.Requests
{
    public class GetEmployeesRequest:IRequest<SearchResultsDto<EmployeeDto>>
    {
        public int EmployeeId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int ContactNumber { get; set; }
        public string Email { get; set; }
        public string Status { get; set; }
    }
}
