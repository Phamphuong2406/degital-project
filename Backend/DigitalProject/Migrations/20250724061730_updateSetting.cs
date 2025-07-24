using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DigitalProject.Migrations
{
    /// <inheritdoc />
    public partial class updateSetting : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "SettingType",
                table: "Settings",
                type: "varchar(100)",
                maxLength: 100,
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SettingType",
                table: "Settings");
        }
    }
}
