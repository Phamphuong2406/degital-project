namespace DigitalProject.Models.Setting
{
    public class SettingDTO
    {
        public string? Key { get; set; }
        public string? Value { get; set; }
        public string? SettingType { get; set; }
        public string? Discription { get; set; }
        public bool? DisplayOnHome { get; set; }
        public int? DisplayOrderOnHome { get; set; }

    }
    public class SettingOnHome
    {
        public string? Key { get; set; }
        public string? Value { get; set; }
        public string? SettingType { get; set; }
        public string? Discription { get; set; }
    }
}
