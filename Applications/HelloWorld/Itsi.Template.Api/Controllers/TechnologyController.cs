using Itsi.Template.Api.Filters;
using Itsi.Template.DTO;
using Itsi.Template.Service.Contracts;
using System.Threading.Tasks;
using System.Web.Http;

namespace Itsi.Template.Api.Controllers
{
    [RoutePrefix("api/technology")]
    public class TechnologyController : ApiController
    {
        private ITechnologyService _technologyService;
        public TechnologyController(ITechnologyService technologyService)
        {
            _technologyService = technologyService;
        }

        // GET: api/technology
        public async Task<IHttpActionResult> Get()
        {
            var content = await _technologyService.GetTechnologies();
            return Ok(content);
        }

        // POST: api/Technology
        [ValidateModel]
        public async Task<IHttpActionResult> Post([FromBody]TechnologyDto value)
        {
            await _technologyService.AddOrUpdateTechnology(value);
            return (Ok(value));
        }
        
        // DELETE: api/Technology/5
        public async Task<IHttpActionResult> Delete(int id)
        {
            await _technologyService.DeleteTechnology(id);
            return (Ok());
        }
    }
}
