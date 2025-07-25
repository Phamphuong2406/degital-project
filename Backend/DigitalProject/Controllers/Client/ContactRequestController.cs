using DigitalProject.Models.ContactRequest;
using DigitalProject.Services.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace DigitalProject.Controllers.Client
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactRequestController : ControllerBase
    {
        private IContactRequestService _requestService;
        public ContactRequestController(IContactRequestService requestService)
        {
            _requestService = requestService;
        }
        [HttpPost]
        public IActionResult CreateContactRequest(CreateRequestDTO model)
        {
            try
            {
                
                string idAddress = HttpContext.Connection.RemoteIpAddress?.ToString();
                _requestService.AddContactRequest(model,idAddress);
                return Ok("Thêm mới yêu cầu thành công ");
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }

        }

    }
}
