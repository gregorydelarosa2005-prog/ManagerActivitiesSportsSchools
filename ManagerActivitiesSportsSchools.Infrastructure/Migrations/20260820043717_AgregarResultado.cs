using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ManagerActivitiesSportsSchools.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AgregarResultado : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Resultados",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EquipoLocal = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EquipoVisitante = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    GolesLocal = table.Column<int>(type: "int", nullable: false),
                    GolesVisitante = table.Column<int>(type: "int", nullable: false),
                    Fecha = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Lugar = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Resultados", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Resultados");
        }
    }
}
