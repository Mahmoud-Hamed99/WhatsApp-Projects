using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Test_Apis.Models
{
    public class Contact
    {
        public int ContactId { get; set; }

        public string ContacName { get; set; }

        public string ContactNumber { get; set; }

        public string ContactMail { get; set; }

        public ICollection<ProjectContacts> ProjectContacts { get; set; }

        public ICollection<UserContacts> UserContacts { get; set; }
    }
}