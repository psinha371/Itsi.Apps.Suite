using System.ComponentModel.DataAnnotations;

namespace Itsi.Template.DTO
{
    public class TechnologyDto
    {
        [Required]
        public int Id { get; set; }
        [Required]
        [MaxLength(100)]
        public string Name { get; set; }
        public string Version { get; set; }
        [MaxLength(256)]
        public string Description { get; set; }
    }
}
