using DigitalProject.Services.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net.NetworkInformation;

namespace DigitalProject.Controllers.Client
{
    [Route("api/[controller]")]
    [ApiController]
    public class ShowProjectController : ControllerBase
    {
        private readonly IProjectService _projectService;
        public ShowProjectController(IProjectService projectService) { _projectService = projectService; }

        [HttpGet]
        [Route("ShowOnHeader")]
        public IActionResult ShowOnHeader(int pageNumber= 1, int pageSize= 1)
        {
            try
            {
                return Ok(_projectService.GetListOnHeader(pageNumber,pageSize));
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet]
        [Route("ShowOnHomePage")]
        public IActionResult ShowOnHomePage()
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
        [Route("ShowOnOurProject")]
        public IActionResult ShowOnOurProject(int pageNumber=1, int pageSize=3)
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
        [Route("ShowProjectDetail/{projectId}")]
        public IActionResult ShowProjectDetail(int projectId)
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
