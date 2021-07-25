namespace Test_Apis.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class UpdateDatetostring : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Msgs", "Created_at", c => c.String());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Msgs", "Created_at", c => c.DateTime(nullable: false));
        }
    }
}
