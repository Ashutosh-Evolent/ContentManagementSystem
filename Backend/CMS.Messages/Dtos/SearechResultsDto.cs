using System;
using System.Collections.Generic;
using System.Text;

namespace CMS.Messages.Dtos
{
    public class SearchResultsDto<T>
    {
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
        public long TotalCount { get; set; }
        public IList<T> Results { get; set; }
    }
}
