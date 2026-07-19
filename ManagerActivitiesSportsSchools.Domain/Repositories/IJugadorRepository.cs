using System;
using System.Collections.Generic;
using System.Text;

using ManagerActivitiesSportsSchools.Domain.Entities;

namespace ManagerActivitiesSportsSchools.Domain.Repositories;

public interface IJugadorRepository
{
    Task<List<Jugador>> GetAllAsync();
    Task<Jugador?> GetByIdAsync(int id);
    Task AddAsync(Jugador jugador);
    Task UpdateAsync(Jugador jugador);
    Task DeleteAsync(int id);
}