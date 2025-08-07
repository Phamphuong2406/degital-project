using AutoMapper;
using DigitalProject.Common.Paging;
using DigitalProject.Common.UploadFile;
using DigitalProject.Entitys;
using DigitalProject.Models.Project;
using DigitalProject.Repositories.Interface;
using DigitalProject.Services.Interface;

namespace DigitalProject.Services.Implements
{
    public class ProjectService : IProjectService
    {
        private readonly IProjectRepository _projectRepo;
        private readonly IMapper _mapper;
        public ProjectService(IProjectRepository projectRepo, IMapper mapper)
        {
            _projectRepo = projectRepo;
            _mapper = mapper;
        }
        public List<Project> GetListProject()
        {
            try
            {
                return _projectRepo.GetListProject();
            }
            catch (Exception)
            {
                throw;
            }
         
        }
        public PagingModel<GetProject> GetListProjectByKeyword(string? key, string? structuralEngineer, DateTime? postingStartDate , DateTime? postingEndDate, int pageNumber, int pageSize)
        {
            try
            {
                return _projectRepo.GetListProjectByKey(key, structuralEngineer, postingStartDate, postingEndDate, pageNumber, pageSize);
            }
            catch (Exception)
            {

                throw ;
            }
        }
        public Project GetByProjectId(int projectId)
        {
            try
            {
                return _projectRepo.FindById(projectId);
            }
            catch (Exception)
            {
                throw;
            }
        }
        public void AddProject(ProjectDTO model, int currentUserId)
        {
            try
            {
                var result = _projectRepo.FindByName(model.ProjectName);
               
                var project = _mapper.Map<Project>(model);
                project.PostedTime = DateTime.Now;
                project.AvatarUrl = UploadHandler.Upload(model.Avatar);
                project.IdPoster = currentUserId;
                _projectRepo.CreateProject(project);
            }
            catch (Exception)
            {
                throw;
            }

        }
        public void EditProject(ProjectDTO model, int projectId, int currentUserId)
        {
            try
            {
                var currentProject = _projectRepo.FindById(projectId);
                UploadHandler.DeleteFile(currentProject.AvatarUrl);
                var project = _projectRepo.FindById(projectId);
                project.ProjectName = model.ProjectName;
                project.ProjectType = model.ProjectType;
                if(model.Avatar== null)
                {
                    project.AvatarUrl = model.AvatarOld;
                }
                else
                {
                    project.AvatarUrl = UploadHandler.Upload(model.Avatar);
                }
                project.ShortDescription = model.ShortDescription;
                project.DetailedDescription = model.DetailedDescription;
                project.Architect = model.Architect;
                project.StructuralEngineer = model.StructuralEngineer;
                project.ConstructionEndTime = model.ConstructionEndTime;
                project.ConstructionStartTime = model.ConstructionStartTime;
                project.PostedTime = DateTime.Now;
                project.DisplayOnHeader = model.DisplayOnHeader;
                project.DisplayOnhome = model.DisplayOnhome;
                project.DisplayOrderOnHeader = model.DisplayOrderOnHeader;
                project.DisplayOrderOnHome = model.DisplayOrderOnHome;
                project.ExpirationTimeOnHeader = model.ExpirationTimeOnHeader;
                project.IdPoster = currentUserId;

                _projectRepo.EditProject(project);
            }
            catch (Exception)
            {

                throw;
            }
           
        }
        public void DeleteProject(int projectId)
        {
            try
            {
                var project = _projectRepo.FindById(projectId);
                UploadHandler.DeleteFile(project.AvatarUrl);
                _projectRepo.DeleteProject(project);
            }
            catch (Exception)
            {
                throw;
            }
          
        }

        //Client
        public List<ProjectOnHomeAndHeader> GetListOnHomePage()
        {
            try
            {
                return _projectRepo.GetListOnHomePage();
            }
            catch (Exception)
            {

                throw;
            }
        }
        public PagingDataReturn<ProjectOnHomeAndHeader> GetListOnHeader()
        {
            try
            {
                return _projectRepo.GetListOnHeader();
            }
            catch (Exception)
            {

                throw;
            }
          
        }
        public PagingModel<ShowOnOurProject> GetListShowOnOurProject(int pageNumber, int pageSize)
        {
            try
            {
                return _projectRepo.GetListShowOnOurProject(pageNumber,pageSize);
            }
            catch (Exception)
            {

                throw;
            }
        }
        public ProjectDetail GetProjectDetail(int projectId)
        {
            try
            {
                var listProject = _projectRepo.GetProjectDetails(projectId);
                return _mapper.Map<ProjectDetail>(listProject);
            }
            catch (Exception)
            {

                throw;
            }
        
        }
    }
}
