using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration;

namespace Itsi.Template.Data
{
    public class Technology
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Version { get; set; }
        public string Description { get; set; }
    }

    public class TechnologyConfiguration : EntityTypeConfiguration<Technology>
    {
        public TechnologyConfiguration()
        {
            HasKey(t => t.Id);
            Property(t => t.Id).HasDatabaseGeneratedOption(System.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedOption.Identity);
            Property(t => t.Name).IsRequired().HasMaxLength(100);
            Property(t => t.Description).HasMaxLength(256);
        }
    }
}