using DigitalProject.Services.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DigitalProject.Controllers.Client
{
    [Route("api/[controller]")]
    [ApiController]
    public class SettingController : ControllerBase
    {
        private ISettingService _settingService;
        public SettingController(ISettingService settingService)
        {
            _settingService = settingService;
        }
        [HttpGet]
        [Route("GetListDisplayedOnFooter")]
        public IActionResult GetListDisplayedOnFooter()
        {
            try
            {
                return Ok(_settingService.GetListDisplayedOnFooter());
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
        [HttpGet]
        [Route("GetListDisplayedOnContactInfor")]
        public IActionResult GetListDisplayedOnContactInfor()
        {
            try
            {
                return Ok(_settingService.GetListDisplayedOnContactInfor());
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
