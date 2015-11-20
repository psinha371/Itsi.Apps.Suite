using Itsi.Template.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Itsi.Template.Service.Contracts;

namespace Itsi.Template.Service
{
    public class TechnologyService: ITechnologyService
    {
        private TemplateContext _templateContext;
        public TechnologyService(TemplateContext templateContext)
        {
            this._templateContext = templateContext;
        }

        public Task<List<Technology>> GetTechnologies()
        {
            
        }
    }
}
