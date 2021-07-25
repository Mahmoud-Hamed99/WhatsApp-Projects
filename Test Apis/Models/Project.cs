using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Test_Apis.Models
{
    public class Project
    {
        
        public int ProjectId { get; set; }

        [Required]
        public string ProjectName { get; set; }

        public int UserId { get; set; }

        public User User { get; set; }

        public ICollection<Msg> Msgs { get; set; }

        public ICollection<ProjectContacts> ProjectContacts { get; set; }

    }
}