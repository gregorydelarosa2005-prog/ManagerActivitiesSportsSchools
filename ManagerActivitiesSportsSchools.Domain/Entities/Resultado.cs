namespace ManagerActivitiesSportsSchools.Domain.Entities
{
    public class Resultado
    {
        public int Id { get; set; }

        public string EquipoLocal { get; set; } = string.Empty;

        public string EquipoVisitante { get; set; } = string.Empty;

        public int CarrerasLocal { get; set; }

        public int CarrerasVisitante { get; set; }

        public DateTime Fecha { get; set; }

        public string Lugar { get; set; } = string.Empty;
    }
}