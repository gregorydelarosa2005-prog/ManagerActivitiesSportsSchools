using System;
using System.Collections.Generic;
using System.Text;

namespace ManagerActivitiesSportsSchools.Application.Dtos.Jugador;

public class JugadorDto
{
    public int Id { get; set; }

    public string Nombre { get; set; } = string.Empty;

    public int Edad { get; set; }

    public int EquipoId { get; set; }
}