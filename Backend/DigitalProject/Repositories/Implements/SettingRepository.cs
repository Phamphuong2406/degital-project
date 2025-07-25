using AutoMapper;
using DigitalProject.Common.Paging;
using DigitalProject.Entitys;
using DigitalProject.Models.Gallery;
using DigitalProject.Models.Project;
using DigitalProject.Models.Setting;
using DigitalProject.Repositories.Interface;
using System.Collections.Generic;

namespace DigitalProject.Repositories.Implements
{
    public class SettingRepository: ISettingRepository
    {
        private readonly MyDbContext _context;
        private readonly IMapper _mapper;
        public SettingRepository(MyDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public List<Setting> GetListSetting()
        {
            return _context.settings.ToList();
        }
        public void AddSetting(Setting model)
        {
            _context.settings.Add(model);
            _context.SaveChanges();
        }
      
        public Setting? FindById(int id)
        {
            return _context.settings.FirstOrDefault(x => x.Id == id);
        }
        public void EditSetting(Setting model)
        {
            _context.settings.Update(model);
            _context.SaveChanges();
        }

        public void DeleteSetting(Setting model)
        {
            _context.settings.Remove(model);
            _context.SaveChanges();
        }

        public bool FindBykey(string keyName)
        {
            _context.settings.FirstOrDefault(x => x.Key == keyName);
            return true;
        }
        public PagingModel<SettingDTO> GetListSettingByKeyword(string? key, int pageNumber, int pageSize)
        {
            var query = _context.settings.AsQueryable();
            if (!string.IsNullOrEmpty(key))
            {
                query = query.Where(z => z.Key.ToLower().Contains(key) || z.SettingType.Contains(key));
            }

            var totalRecords = query.Count();
            var pagedData = query.Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToList();
            var data = _mapper.Map<List<SettingDTO>>(pagedData);
            return new PagingModel<SettingDTO>
            {
                PageNumber = pageNumber,
                PageSize = pageSize,
                Data = data,
                TotalRecords = totalRecords
            };

        }
        public List<SettingOnHome> GetListDisplayedOnFooter()
        {
            var query = _context.settings.Where(x => x.SettingType == "Contact" && x.DisplayOnHome == true).OrderBy(x => x.DisplayOrderOnHome).ToList();
           return _mapper.Map<List<SettingOnHome>>(query);
        }
        public List<SettingOnHome> GetListDisplayedOnContactInfor()
        {
            var query = _context.settings.Where(x => x.SettingType == "Contact" && x.DisplayOnHome == true).OrderBy(x => x.DisplayOrderOnHome).Take(3).ToList();
            return _mapper.Map<List<SettingOnHome>>(query);
        }
    }
}
