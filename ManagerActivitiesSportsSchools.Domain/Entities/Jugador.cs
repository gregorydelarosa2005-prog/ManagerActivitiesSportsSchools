using System;
using System.Collections.Generic;
using System.Text;

namespace ManagerActivitiesSportsSchools.Domain.Entities
{
    public class Jugador
    {
        public int Id { get; set; }

        public string Nombre { get; set; }

        public int Edad { get; set; }

        public int EquipoId { get; set; }

        public Equipo Equipo { get; set; }
    }
}
