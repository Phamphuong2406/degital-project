using DigitalProject.Common.Paging;
using DigitalProject.Entitys;
using DigitalProject.Models.Project;

namespace DigitalProject.Services.Interface
{
    public interface IProjectService
    {
        List<Project> GetListProject();
        PagingModel<GetProject> GetListProjectByKeyword(string? key, string? structuralEngineer, DateTime? postingStartDate , DateTime? postingEndDate , int pageNumber, int pageSize);
        Project GetByProjectId(int projectId);
        void AddProject(ProjectDTO model,int currentUserId);
        void EditProject(ProjectDTO model, int projectId,int currentUserId);
        void DeleteProject(int projectId);
        List<ProjectOnHomeAndHeader> GetListOnHomePage();
        PagingDataReturn<ProjectOnHomeAndHeader> GetListOnHeader();
        PagingModel<ShowOnOurProject> GetListShowOnOurProject(int pageNumber, int pageSize);
        ProjectDetail GetProjectDetail(int projectId);
    }
}
