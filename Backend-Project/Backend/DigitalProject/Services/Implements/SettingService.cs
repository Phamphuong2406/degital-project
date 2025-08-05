﻿using AutoMapper;
using DigitalProject.Common.Paging;
using DigitalProject.Entitys;
using DigitalProject.Models.Setting;
using DigitalProject.Repositories.Interface;
using DigitalProject.Services.Interface;

namespace DigitalProject.Services.Implements
{
    public class SettingService: ISettingService
    {
        private readonly ISettingRepository _SettingRepo;
        private readonly ILogger<SettingService> _logger;
        private readonly IMapper _mapper;
        public SettingService(ISettingRepository SettingRepo, ILogger<SettingService> logger, IMapper mapper)
        {
            _SettingRepo = SettingRepo;
            _logger = logger;
            _mapper = mapper;
        }

        public List<SettingDTO> GetListSetting()
        {
            try
            {
                var result = _SettingRepo.GetListSetting();
                return _mapper.Map<List<SettingDTO>>(result);//map entity => DTO
            }
            catch (Exception)
            {

                throw;
            }
        }
        public SettingDTO FindBySettingId(int settingId)
        {
            try
            {
                var setting = _SettingRepo.FindById(settingId);
                return _mapper.Map<SettingDTO>(setting);
            }
            catch (Exception)
            {
                throw;
            }

        }
        public PagingModel<SettingDTO> GetListSettingByKeyword(string? key, int pageNumber, int pageSize)
        {
            try
            {
               return _SettingRepo.GetListSettingByKeyword(key, pageNumber, pageSize);
            }
            catch (Exception)
            {

                throw;
            }
        }
        public void CreateSetting(SettingCreateOrUpdate model)
        {
            try
            {
                var SettingExist = _SettingRepo.FindBykey(model.Key);

                var Setting = _mapper.Map<Setting>(model);
                _SettingRepo.AddSetting(Setting);
            }
            catch (Exception)
            {
                throw;
            }
        }
        public void EditSetting(SettingCreateOrUpdate dto, int settingId)
        {
            try
            {
                var Setting = _SettingRepo.FindById(settingId);
                Setting.Key = dto.Key;
                Setting.Value = dto.Value;
                Setting.SettingType = dto.SettingType;
                Setting.Discription = dto.Discription;
                Setting.DisplayOnHome = dto.DisplayOnHome;
                Setting.DisplayOrderOnHome = dto.DisplayOrderOnHome;
                _SettingRepo.EditSetting(Setting);
            }
            catch (Exception)
            {
                throw;
            }

        }
        public void DeleteSetting(int settingId)
        {
            try
            {
                var setting = _SettingRepo.FindById(settingId);
                _SettingRepo.DeleteSetting(setting);
            }
            catch (Exception)
            {
                throw;
            }
        }
       public List<SettingOnHome> GetListDisplayedOnFooter()
        {
            try
            {
                return _SettingRepo.GetListDisplayedOnFooter();
            }
            catch (Exception)
            {
                throw;
            }
        }
        public List<SettingOnHome> GetListDisplayedOnContactInfor()
        {
            try
            {
                return _SettingRepo.GetListDisplayedOnContactInfor();
            }
            catch (Exception)
            {

                throw;
            }
        }
       
    }
}
