using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Configuration;

namespace Itsi.Template.Data
{
    public class MigrationContextFactory : IDbContextFactory<TemplateContext>
    {
        public TemplateContext Create()
        {
            return new TemplateContext(ConfigurationManager.ConnectionStrings["Database.Template.ConnectionString"].ConnectionString);
        }
    }
}
