using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ManagerActivitiesSportsSchools.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class CambiarGolesPorCarreras : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "GolesVisitante",
                table: "Resultados",
                newName: "CarrerasVisitante");

            migrationBuilder.RenameColumn(
                name: "GolesLocal",
                table: "Resultados",
                newName: "CarrerasLocal");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "CarrerasVisitante",
                table: "Resultados",
                newName: "GolesVisitante");

            migrationBuilder.RenameColumn(
                name: "CarrerasLocal",
                table: "Resultados",
                newName: "GolesLocal");
        }
    }
}
