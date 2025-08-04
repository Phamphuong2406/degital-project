using AutoMapper;
using DigitalProject.Common.Paging;
using DigitalProject.Entitys;
using DigitalProject.Models.Project;
using DigitalProject.Repositories.Interface;

namespace DigitalProject.Repositories.Implements
{
    public class ProjectRepository : IProjectRepository
    {
        private readonly MyDbContext _context;

        private readonly IMapper _mapper;
        public ProjectRepository(MyDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public List<Project> GetListProject()
        {
            return _context.projects.ToList();
        }
        public PagingModel<GetProject> GetListProjectByKey(string? key, string? structuralEngineer, DateTime? postingStartDate, DateTime? postingEndDate, int pageNumber, int pageSize)
        {
            var query = _context.projects.AsQueryable();

            if (!string.IsNullOrEmpty(key))
            {
                key = key.ToLower();
                query = query.Where(z =>
                   z.ProjectName.ToLower().Contains(key) || z.ShortDescription.ToLower().Contains(key));
            }

            if (!string.IsNullOrEmpty(structuralEngineer))
            {
                query = query.Where(z => z.StructuralEngineer.ToLower().Contains(structuralEngineer));
            }

            if (postingStartDate.HasValue)
            {
                query = query.Where(z => z.PostedTime >= postingStartDate);
            }
            if (postingEndDate.HasValue)
            {
                var adjustedEnd = postingEndDate.Value.AddDays(1).AddMinutes(-1);
                query = query.Where(z => z.PostedTime <= adjustedEnd);
            }
            var totalRecords = query.Count();
            var pagedData = query.Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToList();
            var data = _mapper.Map<List<GetProject>>(pagedData);
            return new PagingModel<GetProject>
            {
                PageNumber = pageNumber,
                PageSize = pageSize,
                Data = data,
                TotalRecords = totalRecords
            };
        }
        public Project? FindById(int projectId)
        {
            return _context.projects.FirstOrDefault(x => x.ProjectId == projectId);
        }
        public bool FindByName(string ProjectName)
        {
            var project = _context.projects.FirstOrDefault(x => x.ProjectName == ProjectName);
            return true;
        }
        public void CreateProject(Project project)
        {
            _context.projects.Add(project);
            _context.SaveChanges();

        }
        public void EditProject(Project project)
        {
            _context.projects.Update(project);
            _context.SaveChanges();
        }
        public void DeleteProject(Project model)
        {
            _context.projects.Remove(model);
            _context.SaveChanges();
        }

        //Client
        public List<ProjectOnHomeAndHeader> GetListOnHomePage()
        {
            return _context.projects.Where(x => x.DisplayOnhome == true)
                                     .OrderBy(x => x.DisplayOrderOnHome)
                                     .Select(x => new ProjectOnHomeAndHeader
                                     {
                                         ProjectName = x.ProjectName,
                                         AvatarUrl = x.AvatarUrl
                                     })
                                     .Take(5).ToList();
        }

        public PagingDataReturn<ProjectOnHomeAndHeader> GetListOnHeader()
        {
            var query = _context.projects
                        .Where(x => x.DisplayOnHeader == true)
                        .OrderBy(x => x.DisplayOrderOnHeader).Take(3).ToList();

  
            var totalRecords = query.Count();
            var data = _mapper.Map<List<ProjectOnHomeAndHeader>>(query);

            return new PagingDataReturn<ProjectOnHomeAndHeader>
            {
                Data = data,
                TotalCount = totalRecords
            };
        }

        public PagingModel<ShowOnOurProject> GetListShowOnOurProject(int pageNumber, int pageSize)
        {
            var query = _context.projects.OrderByDescending(x => x.PostedTime);
            var totalRecords = query.Count();

            var pagedData = query.Skip((pageNumber - 1) * pageSize)
                                 .Take(pageSize)
                                 .ToList();

            var data = _mapper.Map<List<ShowOnOurProject>>(pagedData);

            return new PagingModel<ShowOnOurProject>
            {
                PageNumber = pageNumber,
                PageSize = pageSize,
                Data = data,
                TotalRecords = totalRecords
            };
        }

        public Project GetProjectDetails(int projectId) {

            return _context.projects.FirstOrDefault(x => x.ProjectId == projectId);

        }
    }
}
