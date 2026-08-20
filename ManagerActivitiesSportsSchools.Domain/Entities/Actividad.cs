using System;
using System.Collections.Generic;
using System.Text;

namespace ManagerActivitiesSportsSchools.Domain.Entities
{
    public class Actividad
    {
        public int Id { get; set; }

        public string Nombre { get; set; } = string.Empty;

        public DateTime Fecha { get; set; }

        public string Lugar { get; set; } = string.Empty;

        public string Descripcion { get; set; } = string.Empty;
    }
}