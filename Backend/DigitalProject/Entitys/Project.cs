namespace DigitalProject.Entitys
{
    public class Project
    {
        public int ProjectId { get; set; }
        public string ProjectName { get; set; }
        public string ProjectType { get; set; }
        public string AvatarUrl { get; set; }
        public string? ShortDescription { get; set; }
        public string? DetailedDescription { get; set; }
        public string? Architect { get; set; }
        public string? StructuralEngineer { get; set; }
        public DateTime ConstructionStartTime { get; set; }
        public DateTime ConstructionEndTime { get; set; }
        public DateTime PostedTime { get; set; }
        public bool DisplayOnhome { get; set; }
        public int? DisplayOrderOnHome { get; set; }
        public bool DisplayOnHeader { get; set; }
        public int? DisplayOrderOnHeader { get; set; }
        public DateTime? ExpirationTimeOnHeader { get; set; }
        public int IdPoster { get; set; }
        public virtual User users { get; set; }

    }
}
