using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Reflection.Metadata;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using Test_Apis.Models;
using System.Web.Http.Cors;

namespace Test_Apis.Controllers
{
   [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class MsgsController : ApiController
    {
        private Context db = new Context();

        // GET: api/Msgs
        public IQueryable<Msg> GetMsgs(int ProjectId)
        {
            return db.Msgs.Where(a=>a.ProjectId == ProjectId);
        }

        // GET: api/Msgs/5
        [ResponseType(typeof(Msg))]
        public IHttpActionResult GetMsg(int id)
        {
            Msg msg = db.Msgs.Find(id);
            if (msg == null)
            {
                return NotFound();
            }
            return Ok(msg);
        }

        // PUT: api/Msgs/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutMsg(int id, Msg msg)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != msg.MsgId)
            {
                return BadRequest();
            }

            db.Entry(msg).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MsgExists(id))
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

        [ResponseType(typeof(string))]
        public IHttpActionResult GetRecord(int ProjectId , int MsgId)
        {
            return Ok(Helper.ReadRecord(ProjectId, MsgId));
        }


        [HttpPost]
        [ResponseType(typeof(Msg))]
        public IHttpActionResult PostMsg(MsgRecord MsgRecord)
        {
            db.Msgs.Add(MsgRecord.TextmsgObj);
            db.SaveChanges();
            if (MsgRecord.TextmsgObj.Record == true)
            {
                Helper.SaveRecord(MsgRecord);
            }

            return CreatedAtRoute("DefaultApi", new { id = MsgRecord.TextmsgObj.MsgId }, MsgRecord.TextmsgObj);
        }

        
        // DELETE: api/Msgs/5
        [ResponseType(typeof(Msg))]
        public IHttpActionResult DeleteMsg(int id)
        {
            Msg msg = db.Msgs.Find(id);
            if (msg == null)
            {
                return NotFound();
            }

            db.Msgs.Remove(msg);
            db.SaveChanges();

            return Ok(msg);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool MsgExists(int id)
        {
            return db.Msgs.Count(e => e.MsgId == id) > 0;
        }
    }
}