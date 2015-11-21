using Itsi.Template.Data;
using Itsi.Template.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Itsi.Template.Service.Contracts
{
    public interface ITechnologyService
    {
        Task<List<TechnologyDto>> GetTechnologies();
        Task AddOrUpdateTechnology(TechnologyDto technology);
        Task DeleteTechnology(int technologyID);
    }
}
