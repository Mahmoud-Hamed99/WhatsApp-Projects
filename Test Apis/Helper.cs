using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.IO;
using Test_Apis.Models;
using System.Text;

namespace Test_Apis
{
    public class Helper
    {
     static string startupPath = System.Web.Hosting.HostingEnvironment.MapPath("~/" + "Records/");

        public static void SaveRecord(MsgRecord dta)
        {
            
            byte[] AudioBytes = Convert.FromBase64String(dta.RecordMsgObj.base64data);

            if (!Directory.Exists(startupPath + dta.RecordMsgObj.ProjectId)) // text file name
            {
                Directory.CreateDirectory(startupPath + dta.RecordMsgObj.ProjectId);
                File.WriteAllBytes(startupPath + dta.RecordMsgObj.ProjectId + "/" + dta.TextmsgObj.MsgId + ".webm", AudioBytes);
            }
            else
            {
                File.WriteAllBytes(startupPath + dta.RecordMsgObj.ProjectId + "/" + dta.TextmsgObj.MsgId + ".webm", AudioBytes);
            }
        }

        public static string ReadRecord(int pId , int MsgId)
        {
            string myRecord = "";
           if (Directory.Exists(startupPath + pId))
            {
               byte[] recordbytes= File.ReadAllBytes(startupPath + "/" + pId + "/" + MsgId+".webm");
                myRecord = Convert.ToBase64String(recordbytes);
            }
            return myRecord;
        }
    }
}