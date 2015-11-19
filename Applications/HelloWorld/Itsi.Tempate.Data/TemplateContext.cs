using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Itsi.Template.Data
{
    public class TemplateContext : DbContext
    {
        public virtual DbSet<Technology> Technologies { get; set; }

        public TemplateContext(string connectionString) : base(connectionString)
        { }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Configurations.Add(new TechnologyConfiguration());

            Database.SetInitializer(new MigrateDatabaseToLatestVersion<TemplateContext, Migrations.Configuration>(true));
        }
    }
}
