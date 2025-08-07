using DigitalProject.Services.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DigitalProject.Controllers.Client
{
    [Route("api/[controller]")]
    [ApiController]
    public class GalleryController : ControllerBase
    {
        private IGalleryService _galleryService;
        public GalleryController(IGalleryService galleryService)
        {
            _galleryService = galleryService;
        }
        [HttpGet]
        [Route("GalleryDisplayedOnPhotoGallery")]
        public IActionResult GalleryDisplayedOnPhotoGallery(int pageNumber = 1, int pageSize = 10)
        {
            try
            {
                return Ok(_galleryService.GetListShowPhotoGallery(pageNumber, pageSize));
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }

        }

    }
}
