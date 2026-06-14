using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ManagerActivitiesSportsSchools.API.Data;
using ManagerActivitiesSportsSchools.API.Entities;
using ManagerActivitiesSportsSchools.API.DTOs;
namespace ManagerActivitiesSportsSchools.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EquiposController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public EquiposController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var equipos = await _context.Equipos.ToListAsync();

            return Ok(equipos);
        }

        [HttpPost]
        public async Task<IActionResult> Post(EquipoDTO dto)
        {
            var equipo = new Equipo
            {
                Nombre = dto.Nombre,
                Categoria = dto.Categoria
            };

            _context.Equipos.Add(equipo);

            await _context.SaveChangesAsync();

            return Ok(equipo);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var equipo = await _context.Equipos.FindAsync(id);

            if (equipo == null)
            {
                return NotFound();
            }

            return Ok(equipo);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, EquipoDTO dto)
        {
            var equipo = await _context.Equipos.FindAsync(id);

            if (equipo == null)
            {
                return NotFound();
            }

            equipo.Nombre = dto.Nombre;
            equipo.Categoria = dto.Categoria;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var equipo = await _context.Equipos.FindAsync(id);

            if (equipo == null)
            {
                return NotFound();
            }

            _context.Equipos.Remove(equipo);

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
