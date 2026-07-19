using System;
using System.Collections.Generic;
using System.Text;

using System.ComponentModel.DataAnnotations;

namespace ManagerActivitiesSportsSchools.Application.Dtos.Equipo;

public class SaveEquipoDto
{
    [Required]
    public string Nombre { get; set; } = string.Empty;

    [Required]
    public string Categoria { get; set; } = string.Empty;
}