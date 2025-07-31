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
        void AddProject(ProjectDTO model);
        void EditProject(ProjectDTO model, int projectId);
        void DeleteProject(int projectId);
        List<ProjectOnHomeAndHeader> GetListOnHomePage();
        PagingModel<ProjectOnHomeAndHeader> GetListOnHeader(int pageNumber, int pageSize);
        PagingModel<ShowOnOurProject> GetListShowOnOurProject(int pageNumber, int pageSize);
        ProjectDetail GetProjectDetail(int projectId);
    }
}
