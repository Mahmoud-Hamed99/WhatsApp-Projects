using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Test_Apis.Models
{
    public class UserContacts
    {
        public int UserContactsId { get; set; }

        public int UserId { get; set; }

        public User User { get; set; }

        public int ContactId { get; set; }

        public Contact Contact { get; set; }
    }
}