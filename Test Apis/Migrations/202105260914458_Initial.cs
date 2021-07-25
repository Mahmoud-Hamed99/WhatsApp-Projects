namespace Test_Apis.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Initial : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Contacts",
                c => new
                    {
                        ContactId = c.Int(nullable: false, identity: true),
                        ContacName = c.String(),
                        ContactNumber = c.String(),
                        ContactMail = c.String(),
                    })
                .PrimaryKey(t => t.ContactId);
            
            CreateTable(
                "dbo.ProjectContacts",
                c => new
                    {
                        ProjectId = c.Int(nullable: false),
                        ContactId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.ProjectId, t.ContactId })
                .ForeignKey("dbo.Contacts", t => t.ContactId, cascadeDelete: true)
                .ForeignKey("dbo.Projects", t => t.ProjectId, cascadeDelete: true)
                .Index(t => t.ProjectId)
                .Index(t => t.ContactId);
            
            CreateTable(
                "dbo.Projects",
                c => new
                    {
                        ProjectId = c.Int(nullable: false, identity: true),
                        ProjectName = c.String(nullable: false),
                        UserId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.ProjectId)
                .ForeignKey("dbo.Users", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId);
            
            CreateTable(
                "dbo.Msgs",
                c => new
                    {
                        MsgId = c.Int(nullable: false, identity: true),
                        Message = c.String(),
                        Created_at = c.DateTime(nullable: false),
                        SenderId = c.Int(nullable: false),
                        ReceiverId = c.Int(nullable: false),
                        ProjectId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.MsgId)
                .ForeignKey("dbo.Projects", t => t.ProjectId, cascadeDelete: true)
                .Index(t => t.ProjectId);
            
            CreateTable(
                "dbo.Users",
                c => new
                    {
                        UserId = c.Int(nullable: false, identity: true),
                        UserName = c.String(),
                        UserPhone = c.String(),
                        UserMail = c.String(),
                        UserPassword = c.String(),
                    })
                .PrimaryKey(t => t.UserId);
            
            CreateTable(
                "dbo.UserContacts",
                c => new
                    {
                        UserContactsId = c.Int(nullable: false, identity: true),
                        UserId = c.Int(nullable: false),
                        ContactId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.UserContactsId)
                .ForeignKey("dbo.Contacts", t => t.ContactId, cascadeDelete: true)
                .ForeignKey("dbo.Users", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId)
                .Index(t => t.ContactId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.UserContacts", "UserId", "dbo.Users");
            DropForeignKey("dbo.UserContacts", "ContactId", "dbo.Contacts");
            DropForeignKey("dbo.Projects", "UserId", "dbo.Users");
            DropForeignKey("dbo.ProjectContacts", "ProjectId", "dbo.Projects");
            DropForeignKey("dbo.Msgs", "ProjectId", "dbo.Projects");
            DropForeignKey("dbo.ProjectContacts", "ContactId", "dbo.Contacts");
            DropIndex("dbo.UserContacts", new[] { "ContactId" });
            DropIndex("dbo.UserContacts", new[] { "UserId" });
            DropIndex("dbo.Msgs", new[] { "ProjectId" });
            DropIndex("dbo.Projects", new[] { "UserId" });
            DropIndex("dbo.ProjectContacts", new[] { "ContactId" });
            DropIndex("dbo.ProjectContacts", new[] { "ProjectId" });
            DropTable("dbo.UserContacts");
            DropTable("dbo.Users");
            DropTable("dbo.Msgs");
            DropTable("dbo.Projects");
            DropTable("dbo.ProjectContacts");
            DropTable("dbo.Contacts");
        }
    }
}
