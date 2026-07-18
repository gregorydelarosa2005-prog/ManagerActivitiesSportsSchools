using System;
using System.Collections.Generic;
using System.Text;

namespace ManagerActivitiesSportsSchools.Domain.Entities
{
    internal class Equipo
    {
        public int Id { get; set; }

        public string Nombre { get; set; }

        public string Categoria { get; set; }

        public List<Jugador> Jugadores { get; set; } = new();
    }
}
