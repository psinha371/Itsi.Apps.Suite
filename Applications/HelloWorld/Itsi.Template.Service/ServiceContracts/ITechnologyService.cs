using Itsi.Template.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Itsi.Template.Service.Contracts
{
    public interface ITechnologyService
    {
        Task<List<Technology>> GetTechnologies();
    }
}
