using AutoMapper;
using DigitalProject.Common.Paging;
using DigitalProject.Entitys;
using DigitalProject.Models.Setting;
using Microsoft.EntityFrameworkCore;

namespace DigitalProject.Repositories.Interface
{
    public interface ISettingRepository
    {
        List<Setting> GetListSetting();
        void AddSetting(Setting model);
        Setting FindById(int id);
        bool FindBykey(string keyName);
        void EditSetting(Setting model);
        void DeleteSetting(Setting model);
        PagingModel<SettingDTO> GetListSettingByKeyword(string? key, int pageNumber, int pageSize);
        List<SettingOnHome> GetListDisplayedOnFooter();
        List<SettingOnHome> GetListDisplayedOnContactInfor();
    }
}
