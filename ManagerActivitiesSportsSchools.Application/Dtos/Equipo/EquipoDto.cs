using System;
using System.Collections.Generic;
using System.Text;

namespace ManagerActivitiesSportsSchools.Application.Dtos.Equipo;

public class EquipoDto
{
    public int Id { get; set; }

    public string Nombre { get; set; } = string.Empty;

    public string Categoria { get; set; } = string.Empty;
}