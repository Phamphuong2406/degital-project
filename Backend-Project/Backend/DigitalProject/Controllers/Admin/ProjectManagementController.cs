using DigitalProject.Common.Filter;
using DigitalProject.Models.Project;
using DigitalProject.Services.Interface;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace DigitalProject.Controllers.Admin
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ProjectManagementController : ControllerBase
    {
        private readonly IProjectService _projectService;
        public ProjectManagementController(IProjectService projectService)
        {

            _projectService = projectService;
        }
        [HttpGet]
     
        public IActionResult GetAllProject()
        {
            try
            {
                
                return Ok(_projectService.GetListProject());
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetByProjectId(int id)
        {
            try
            {
                var project = _projectService.GetByProjectId(id);
                return Ok(project);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
        [HttpPost]
        public IActionResult CreateNewProject([FromForm] ProjectDTO model)
        {
            try
            {
                var claimsIdentity = this.User.Identity as ClaimsIdentity;
                int currentUserId = Convert.ToInt32(claimsIdentity.FindFirst(ClaimTypes.PrimarySid)?.Value);
                _projectService.AddProject(model, currentUserId);
                return Ok(new { message= "Thêm mới dự án thành công",result= true});
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message , result=false});
            }

        }
        [HttpPut("{projectId}")]
        public IActionResult UpdateProject([FromForm] ProjectDTO dto, int projectId) {
            try
            {
                var claimsIdentity = this.User.Identity as ClaimsIdentity;
                int currentUserId = Convert.ToInt32(claimsIdentity.FindFirst(ClaimTypes.PrimarySid)?.Value);
                _projectService.EditProject(dto, projectId, currentUserId);
                return Ok(new { message = "Cập nhật dự án thành công", result = true });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message , result=true});
            }
        }
     
        [HttpDelete("{id}")]
        public IActionResult DeleteProject(int id)
        {

            try
            {
                _projectService.DeleteProject(id);
                return Ok("Xóa dự án thành công");
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
        [HttpGet]
        [Route("SearchByKey")]
        public IActionResult SearchByKey(string? key, string? structuralEngineer, DateTime? postingStartDate = null, DateTime? postingEndDate = null, int pageNumber = 1, int pageSize = 10)
        {
            try
            {
                return Ok(_projectService.GetListProjectByKeyword(key, structuralEngineer, postingStartDate, postingEndDate, pageNumber, pageSize));
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }

        }
    }
}
