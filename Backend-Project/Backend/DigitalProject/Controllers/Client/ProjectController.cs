using DigitalProject.Entitys;
using DigitalProject.Services.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net.NetworkInformation;
using static System.Net.Mime.MediaTypeNames;

namespace DigitalProject.Controllers.Client
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly IProjectService _projectService;
        public ProjectController(IProjectService projectService) { _projectService = projectService; }

        [HttpGet]
        [Route("ProjectsDisplayedOnHeader")]
        public IActionResult ProjectsDisplayedOnHeader()
        {
            try
            {
                return Ok(_projectService.GetListOnHeader());
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet]
        [Route("ProjectsDisplayedOnHomePage")]
        public IActionResult ProjectsDisplayedOnHomePage()
        {
            try
            {
                return Ok(_projectService.GetListOnHomePage());
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
        [HttpGet]
        [Route("ProjectsDisplayedOnOurProject")]
        public IActionResult ProjectsDisplayedOnOurProject(int pageNumber=1, int pageSize=3)
        {
            try
            {
                return Ok(_projectService.GetListShowOnOurProject(pageNumber,pageSize));
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet]
        [Route("ProjectsDisplayedOnProjectDetail/{projectId}")]
        public IActionResult ProjectsDisplayedOnProjectDetail(int projectId)
        {
            try
            {
                return Ok(_projectService.GetProjectDetail(projectId));
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

    }
}
