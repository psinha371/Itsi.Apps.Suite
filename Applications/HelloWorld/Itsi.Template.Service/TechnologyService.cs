using Itsi.Template.Data;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Itsi.Template.Service.Contracts;
using System.Data.Entity;
using Itsi.Template.DTO;

namespace Itsi.Template.Service
{
    public class TechnologyService: ITechnologyService, IDisposable
    {
        private TemplateContext _templateContext;
        public TechnologyService(TemplateContext templateContext)
        {
            this._templateContext = templateContext;
        }

        public async Task AddOrUpdateTechnology(TechnologyDto technology)
        {
            if(technology == null)
            {
                throw new ArgumentNullException();
            }

            var existingTechnology = await _templateContext.Technologies.FindAsync(technology.Id);
            if (existingTechnology == null)
            {
                _templateContext.Technologies.Add(new Technology
                {
                    Name = technology.Name,
                    Version = technology.Version,
                    Description = technology.Description
                });
            }
            else
            {
                existingTechnology.Name = technology.Name;
                existingTechnology.Version = technology.Version;
                existingTechnology.Description = technology.Description;
            }

            await _templateContext.SaveChangesAsync();
        }

        public async Task DeleteTechnology(int technologyID)
        {
            var existingTechnology = await _templateContext.Technologies.FindAsync(technologyID);
            if (existingTechnology != null)
            {
                _templateContext.Technologies.Remove(existingTechnology);
                await _templateContext.SaveChangesAsync();
            }
        }

        public void Dispose()
        {
            _templateContext.Dispose();
        }

        public async Task<List<TechnologyDto>> GetTechnologies()
        {
            var result = new List<TechnologyDto>();
            var technologies = await _templateContext.Technologies.ToListAsync();
            technologies.ForEach(t => result.Add(new TechnologyDto
            {
                Id = t.Id,
                Name = t.Name,
                Description = t.Description,
                Version = t.Version
            }));
            return result;
        }
    }
}
