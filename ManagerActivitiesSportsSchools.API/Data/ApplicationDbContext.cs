using Microsoft.EntityFrameworkCore;
using ManagerActivitiesSportsSchools.API.Entities;

namespace ManagerActivitiesSportsSchools.API.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(
            DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Equipo> Equipos { get; set; }

        public DbSet<Jugador> Jugadores { get; set; }
    }
}