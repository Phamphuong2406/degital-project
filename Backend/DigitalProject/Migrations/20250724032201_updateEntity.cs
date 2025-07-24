using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DigitalProject.Migrations
{
    /// <inheritdoc />
    public partial class updateEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "note",
                table: "Users",
                newName: "Note");

            migrationBuilder.RenameColumn(
                name: "structuralEngineer",
                table: "Projects",
                newName: "StructuralEngineer");

            migrationBuilder.RenameColumn(
                name: "architect",
                table: "Projects",
                newName: "Architect");

            migrationBuilder.RenameColumn(
                name: "Shortdescription",
                table: "Projects",
                newName: "ShortDescription");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Note",
                table: "Users",
                newName: "note");

            migrationBuilder.RenameColumn(
                name: "StructuralEngineer",
                table: "Projects",
                newName: "structuralEngineer");

            migrationBuilder.RenameColumn(
                name: "ShortDescription",
                table: "Projects",
                newName: "Shortdescription");

            migrationBuilder.RenameColumn(
                name: "Architect",
                table: "Projects",
                newName: "architect");
        }
    }
}
