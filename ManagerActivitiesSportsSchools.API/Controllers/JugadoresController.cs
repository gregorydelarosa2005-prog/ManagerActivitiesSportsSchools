using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ManagerActivitiesSportsSchools.API.Data;
using ManagerActivitiesSportsSchools.API.DTOs;
using ManagerActivitiesSportsSchools.API.Entities;

namespace ManagerActivitiesSportsSchools.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class JugadoresController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public JugadoresController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var jugadores = await _context.Jugadores.ToListAsync();

            return Ok(jugadores);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var jugador = await _context.Jugadores.FindAsync(id);

            if (jugador == null)
            {
                return NotFound();
            }

            return Ok(jugador);
        }

        [HttpPost]
        public async Task<IActionResult> Post(JugadorDTO dto)
        {
            var jugador = new Jugador
            {
                Nombre = dto.Nombre,
                Edad = dto.Edad,
                EquipoId = dto.EquipoId
            };

            _context.Jugadores.Add(jugador);

            await _context.SaveChangesAsync();

            return Ok(jugador);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, JugadorDTO dto)
        {
            var jugador = await _context.Jugadores.FindAsync(id);

            if (jugador == null)
            {
                return NotFound();
            }

            jugador.Nombre = dto.Nombre;
            jugador.Edad = dto.Edad;
            jugador.EquipoId = dto.EquipoId;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var jugador = await _context.Jugadores.FindAsync(id);

            if (jugador == null)
            {
                return NotFound();
            }

            _context.Jugadores.Remove(jugador);

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}