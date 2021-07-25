using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Test_Apis.Models
{
    public class Msg
    {
        public int MsgId { get; set; }

        public string Message { get; set; }

        public string Created_at { get; set; } = DateTime.Now.Hour +":"+DateTime.Now.Minute;

        public int SenderId { get; set; }

        public int ReceiverId { get; set; }

        public int ProjectId { get; set; }

        public Project Project { get; set; }

        public bool Record { get; set; }
    }
}