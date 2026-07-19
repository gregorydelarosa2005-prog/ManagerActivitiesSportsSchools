using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace ManagerActivitiesSportsSchools.Application.Dtos.Jugador;

public class SaveJugadorDto
{
    [Required]
    public string Nombre { get; set; } = string.Empty;

    [Range(5, 100)]
    public int Edad { get; set; }

    [Required]
    public int EquipoId { get; set; }
}