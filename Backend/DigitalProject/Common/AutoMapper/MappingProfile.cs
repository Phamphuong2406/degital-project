using AutoMapper;
using DigitalProject.Entitys;
using DigitalProject.Models.ContactRequest;
using DigitalProject.Models.Gallery;
using DigitalProject.Models.Project;
using DigitalProject.Models.Setting;
using DigitalProject.Models.User;

namespace DigitalProject.Common.AutoMapper
{

    public class MappingProfile: Profile
    {
        public MappingProfile() {
            CreateMap<User, UserDTO>().ReverseMap() ;//map User=> UserDTO
            CreateMap<UserRequestData, User>();
            CreateMap<ContactRequest, GetRequestDTO>();
            CreateMap<ProjectDTO, Project>().ReverseMap();
            CreateMap<Project, GetProject>().ReverseMap();
            CreateMap<User, ClaimCreationData>();
            CreateMap<Gallery, GetGalleryDTO>().ReverseMap(); 
            CreateMap<CreateRequestDTO, ContactRequest>();
            CreateMap<SettingDTO, Setting>().ReverseMap();
            CreateMap<Setting, SettingOnHome>();
            CreateMap<Project, ProjectDetail>();
            CreateMap<Project, ShowOnOurProject>();
            CreateMap<Project, ProjectOnHomeAndHeader>();
            CreateMap<Gallery, ShowPhotoGallery>();
          
        }

    }
}
