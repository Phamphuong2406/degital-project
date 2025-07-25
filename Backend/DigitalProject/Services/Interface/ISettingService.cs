using DigitalProject.Common.Paging;
using DigitalProject.Entitys;
using DigitalProject.Models.Setting;

namespace DigitalProject.Services.Interface
{
    public interface ISettingService
    {

        List<SettingDTO> GetListSetting();
        SettingDTO FindBySettingId(int settingId);
        PagingModel<SettingDTO> GetListSettingByKeyword(string? key, int pageNumber, int pageSize);
        void CreateSetting(SettingDTO model);
        void EditSetting(SettingDTO dto, int settingId);
        void DeleteSetting(int settingId);
        List<SettingOnHome> GetListDisplayedOnFooter();
        List<SettingOnHome> GetListDisplayedOnContactInfor();
    }
}
