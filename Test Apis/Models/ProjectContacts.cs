using ServiceStack.DataAnnotations;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Test_Apis.Models
{
    public class ProjectContacts
    {
        [Key, Column(Order = 0)]
        public int ProjectId { get; set; }

        public Project Project { get; set; }


        [Key, Column(Order = 1)]
        public int ContactId { get; set; }

        public Contact Contact { get; set; }
    }
}