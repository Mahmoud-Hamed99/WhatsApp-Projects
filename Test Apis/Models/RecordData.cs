using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Test_Apis.Models
{
    public class RecordData
    {
        public int UserId { get; set; }
        public int ProjectId { get; set; }
        public string base64data { get; set; }
    }
}