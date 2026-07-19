using ManagerActivitiesSportsSchools.Application.Contract;
using ManagerActivitiesSportsSchools.Application.Dtos.Jugador;
using ManagerActivitiesSportsSchools.Domain.Entities;
using ManagerActivitiesSportsSchools.Domain.Repositories;

namespace ManagerActivitiesSportsSchools.Application.Service
{
    public class JugadorService : IJugadorService
    {
        private readonly IJugadorRepository _repository;

        public JugadorService(IJugadorRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<JugadorDto>> GetAllAsync()
        {
            var jugadores = await _repository.GetAllAsync();

            return jugadores.Select(j => new JugadorDto
            {
                Id = j.Id,
                Nombre = j.Nombre,
                Edad = j.Edad,
                EquipoId = j.EquipoId
            }).ToList();
        }

        public async Task<JugadorDto?> GetByIdAsync(int id)
        {
            var jugador = await _repository.GetByIdAsync(id);

            if (jugador == null)
                return null;

            return new JugadorDto
            {
                Id = jugador.Id,
                Nombre = jugador.Nombre,
                Edad = jugador.Edad,
                EquipoId = jugador.EquipoId
            };
        }

        public async Task CreateAsync(SaveJugadorDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Nombre))
                throw new Exception("El nombre es obligatorio.");

            if (dto.Edad <= 0)
                throw new Exception("La edad debe ser mayor que cero.");

            var jugador = new Jugador
            {
                Nombre = dto.Nombre,
                Edad = dto.Edad,
                EquipoId = dto.EquipoId
            };

            await _repository.AddAsync(jugador);
        }

        public async Task UpdateAsync(int id, SaveJugadorDto dto)
        {
            var jugador = await _repository.GetByIdAsync(id);

            if (jugador == null)
                throw new Exception("Jugador no encontrado.");

            jugador.Nombre = dto.Nombre;
            jugador.Edad = dto.Edad;
            jugador.EquipoId = dto.EquipoId;

            await _repository.UpdateAsync(jugador);
        }

        public async Task DeleteAsync(int id)
        {
            await _repository.DeleteAsync(id);
        }
    }
}