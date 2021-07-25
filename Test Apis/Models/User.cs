﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Test_Apis.Models
{
    public class User
    {
        public int UserId { get; set; }

        public string UserName { get; set; }

        public string UserPhone { get; set; }

        public string UserMail { get; set; }

        public string UserPassword { get; set; }

        public ICollection<Project> Projects { get; set; }

        public ICollection<UserContacts> UserContacts { get; set; }

        
        //public IQueryable<Project> GetProjects(int userid)
        //{
        //    return db.Projects.Where(a => a.ProjectContacts.Where(aa => aa.ContactId == userid).Count() > 0);
        //}

    }
}