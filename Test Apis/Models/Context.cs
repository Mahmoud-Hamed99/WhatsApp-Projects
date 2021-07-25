using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Test_Apis.Models
{
    public class Context:DbContext
    {
        public Context():base("DB")
        {

        }

        public DbSet<Models.Project> Projects { get; set; }

        public DbSet<Models.User> Users { get; set; }

        public DbSet<Models.Contact> Contacts { get; set; }

        public DbSet<Models.ProjectContacts> ProjectContacts { get; set; }

        public DbSet<Models.UserContacts> UserContacts { get; set; }

        public DbSet<Msg> Msgs { get; set; }
    }
}