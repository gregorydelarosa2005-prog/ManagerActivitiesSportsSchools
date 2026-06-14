namespace ManagerActivitiesSportsSchools.API.Entities
{
    public class Equipo
    {
        public int Id { get; set; }

        public string Nombre { get; set; }

        public string Categoria { get; set; }

        public List<Jugador> Jugadores { get; set; } = new();
    }
}