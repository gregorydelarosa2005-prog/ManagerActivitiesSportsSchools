using System;
using System.Collections.Generic;
using System.Text;

using ManagerActivitiesSportsSchools.Application.Dtos.Jugador;

namespace ManagerActivitiesSportsSchools.Application.Contract;

public interface IJugadorService
{
    Task<List<JugadorDto>> GetAllAsync();

    Task<JugadorDto?> GetByIdAsync(int id);

    Task CreateAsync(SaveJugadorDto dto);

    Task UpdateAsync(int id, SaveJugadorDto dto);

    Task DeleteAsync(int id);
}