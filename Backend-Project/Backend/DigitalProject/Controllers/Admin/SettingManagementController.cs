using DigitalProject.Common.Filter;
using DigitalProject.Models.Setting;
using DigitalProject.Services.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace DigitalProject.Controllers.Admin
{
    [Route("api/[controller]")]
    [ApiController]
    public class SettingManagementController : ControllerBase
    {
        private ISettingService _settingService;
        public SettingManagementController(ISettingService settingService)
        {
            _settingService =settingService;
        }

        [HttpGet]
        public IActionResult GetAllSetting()
        {
            try
            {
                return Ok(_settingService.GetListSetting());
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetBySettingId(int id)
        {
            try
            {
                var user = _settingService.FindBySettingId(id);
                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }

        }
        [HttpPost]
        public IActionResult CreateSetting(SettingCreateOrUpdate model)
        {
            try
            {
                _settingService.CreateSetting(model);
                return Ok(new { message = "Thêm mới cài đặt thành công ", result = true });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message, result=false });
            }

        }
        [HttpPut("{id}")]
        public IActionResult UpdateSetting(SettingCreateOrUpdate dto, int id)
        {
            try
            {
                _settingService.EditSetting(dto, id);
                return Ok(new { message = "Cập nhật cài đặt thành công", result = true });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message, result = false });
            }
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteSetting(int id)
        {
            try
            {
                _settingService.DeleteSetting(id);
                return Ok("Xóa cài đặt thành công");
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }

        }
        [HttpGet]
        [Route("SearchByKey")]
        public IActionResult SearchByKeyword(string? key,int pageNumber = 1, int pageSize = 10)
        {
            try
            {
                return Ok(_settingService.GetListSettingByKeyword(key, pageNumber, pageSize));
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }

        }
    }
}
