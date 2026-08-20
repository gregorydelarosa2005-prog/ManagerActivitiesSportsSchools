using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using ManagerActivitiesSportsSchools.Domain.Entities;

namespace ManagerActivitiesSportsSchools.Infrastructure.Context
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

        public DbSet<Actividad> Actividades { get; set; }

        public DbSet<Resultado> Resultados { get; set; }
    }
}
