using ManagerActivitiesSportsSchools.Application.Contract;
using ManagerActivitiesSportsSchools.Application.Dtos.Equipo;
using ManagerActivitiesSportsSchools.Domain.Entities;
using ManagerActivitiesSportsSchools.Domain.Repositories;

namespace ManagerActivitiesSportsSchools.Application.Service
{
    public class EquipoService : IEquipoService
    {
        private readonly IEquipoRepository _repository;

        public EquipoService(IEquipoRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<EquipoDto>> GetAllAsync()
        {
            var equipos = await _repository.GetAllAsync();

            return equipos.Select(e => new EquipoDto
            {
                Id = e.Id,
                Nombre = e.Nombre,
                Categoria = e.Categoria
            }).ToList();
        }

        public async Task<EquipoDto?> GetByIdAsync(int id)
        {
            var equipo = await _repository.GetByIdAsync(id);

            if (equipo == null)
                return null;

            return new EquipoDto
            {
                Id = equipo.Id,
                Nombre = equipo.Nombre,
                Categoria = equipo.Categoria
            };
        }

        public async Task CreateAsync(SaveEquipoDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Nombre))
                throw new Exception("El nombre es obligatorio.");

            if (string.IsNullOrWhiteSpace(dto.Categoria))
                throw new Exception("La categoría es obligatoria.");

            var equipo = new Equipo
            {
                Nombre = dto.Nombre,
                Categoria = dto.Categoria
            };

            await _repository.AddAsync(equipo);
        }

        public async Task UpdateAsync(int id, SaveEquipoDto dto)
        {
            var equipo = await _repository.GetByIdAsync(id);

            if (equipo == null)
                throw new Exception("Equipo no encontrado.");

            equipo.Nombre = dto.Nombre;
            equipo.Categoria = dto.Categoria;

            await _repository.UpdateAsync(equipo);
        }

        public async Task DeleteAsync(int id)
        {
            await _repository.DeleteAsync(id);
        }
    }
}