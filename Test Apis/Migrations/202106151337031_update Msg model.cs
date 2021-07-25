namespace Test_Apis.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class updateMsgmodel : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Msgs", "Record", c => c.Boolean(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Msgs", "Record");
        }
    }
}
