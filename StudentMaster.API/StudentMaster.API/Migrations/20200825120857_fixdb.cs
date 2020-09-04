using Microsoft.EntityFrameworkCore.Migrations;

namespace StudentMaster.API.Migrations
{
    public partial class fixdb : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ScheduleItems_Schedules_ScheduleId",
                table: "ScheduleItems");

            migrationBuilder.DropColumn(
                name: "End",
                table: "ScheduleItems");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "ScheduleItems");

            migrationBuilder.DropColumn(
                name: "Start",
                table: "ScheduleItems");

            migrationBuilder.RenameColumn(
                name: "ScheduleId",
                table: "ScheduleItems",
                newName: "scheduleId");

            migrationBuilder.RenameIndex(
                name: "IX_ScheduleItems_ScheduleId",
                table: "ScheduleItems",
                newName: "IX_ScheduleItems_scheduleId");

            migrationBuilder.AddColumn<int>(
                name: "NameId",
                table: "ScheduleItems",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Position",
                table: "ScheduleItems",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_ScheduleItems_NameId",
                table: "ScheduleItems",
                column: "NameId");

            migrationBuilder.AddForeignKey(
                name: "FK_ScheduleItems_Subjects_NameId",
                table: "ScheduleItems",
                column: "NameId",
                principalTable: "Subjects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ScheduleItems_Schedules_scheduleId",
                table: "ScheduleItems",
                column: "scheduleId",
                principalTable: "Schedules",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ScheduleItems_Subjects_NameId",
                table: "ScheduleItems");

            migrationBuilder.DropForeignKey(
                name: "FK_ScheduleItems_Schedules_scheduleId",
                table: "ScheduleItems");

            migrationBuilder.DropIndex(
                name: "IX_ScheduleItems_NameId",
                table: "ScheduleItems");

            migrationBuilder.DropColumn(
                name: "NameId",
                table: "ScheduleItems");

            migrationBuilder.DropColumn(
                name: "Position",
                table: "ScheduleItems");

            migrationBuilder.RenameColumn(
                name: "scheduleId",
                table: "ScheduleItems",
                newName: "ScheduleId");

            migrationBuilder.RenameIndex(
                name: "IX_ScheduleItems_scheduleId",
                table: "ScheduleItems",
                newName: "IX_ScheduleItems_ScheduleId");

            migrationBuilder.AddColumn<string>(
                name: "End",
                table: "ScheduleItems",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "ScheduleItems",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Start",
                table: "ScheduleItems",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_ScheduleItems_Schedules_ScheduleId",
                table: "ScheduleItems",
                column: "ScheduleId",
                principalTable: "Schedules",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
