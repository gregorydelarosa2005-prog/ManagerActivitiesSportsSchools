using System;
using System.Collections.Generic;
using System.Text;
using ManagerActivitiesSportsSchools.Application.Dtos.Equipo;

namespace ManagerActivitiesSportsSchools.Application.Contract;

public interface IEquipoService
{
    Task<List<EquipoDto>> GetAllAsync();

    Task<EquipoDto?> GetByIdAsync(int id);

    Task CreateAsync(SaveEquipoDto dto);

    Task UpdateAsync(int id, SaveEquipoDto dto);

    Task DeleteAsync(int id);
}