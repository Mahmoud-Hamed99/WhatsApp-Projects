using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using Test_Apis.Models;

namespace Test_Apis.Controllers
{
    public class ProjectsController : ApiController
    {
        private Context db = new Context();

        // GET: api/Projects
        public IQueryable<Project> GetProjects()
        {
            return db.Projects;
        }

        public List<Project> GetProjects(int? userId, string userName)
        {
           List<Project> projectsList = new List<Project>();
            int contactId = 0;

            if (userId != null)
            {
                projectsList = db.Projects.Where(a => a.UserId == userId).ToList();
            }
           if (userName != null)
            {
                if (db.Contacts.Where(a => a.ContacName == userName).Count()>0)
                     contactId = db.Contacts.Where(a => a.ContacName == userName).FirstOrDefault().ContactId;

                List<int> projectIds= db.ProjectContacts.Where(a=>a.ContactId== contactId).Select(x=>x.ProjectId).ToList();
                for(int i=0; i<projectIds.Count(); i++)
                {
                    var x = projectIds[i];
                    projectsList.Add(db.Projects.Where(a => a.ProjectId == x).First());
                }
            }
           

            return projectsList;               
        }

        public List<string> GetProjectContacts(int projectId, string userName)
        {
            int contactId = 0;
            if (db.Contacts.Where(a => a.ContacName == userName).Count() > 0)
                 contactId = db.Contacts.Where(a => a.ContacName == userName).FirstOrDefault().ContactId;
            
            List<string> contacts= db.ProjectContacts.Where(a => a.ProjectId == projectId && a.ContactId !=contactId ).Select(x=>x.Contact.ContacName).ToList();

            contacts.Add(db.Projects.Where(a => a.ProjectId == projectId).Select(x => x.User.UserName).FirstOrDefault());

            return contacts;
        }

        // GET: api/Projects/5
        [ResponseType(typeof(Project))]
        public IHttpActionResult GetProject(int id)
        {
            Project project = db.Projects.Find(id);
            if (project == null)
            {
                return NotFound();
            }

            return Ok(project);
        }

        // PUT: api/Projects/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutProject(int id, Project project)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != project.ProjectId)
            {
                return BadRequest();
            }

            db.Entry(project).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProjectExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Projects
        [ResponseType(typeof(Project))]
        public IHttpActionResult PostProject(Project project)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Projects.Add(project);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = project.ProjectId }, project);
        }

        // DELETE: api/Projects/5
        [ResponseType(typeof(Project))]
        public IHttpActionResult DeleteProject(int id)
        {
            Project project = db.Projects.Find(id);
            if (project == null)
            {
                return NotFound();
            }

            db.Projects.Remove(project);
            db.SaveChanges();

            return Ok(project);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ProjectExists(int id)
        {
            return db.Projects.Count(e => e.ProjectId == id) > 0;
        }
    }
}