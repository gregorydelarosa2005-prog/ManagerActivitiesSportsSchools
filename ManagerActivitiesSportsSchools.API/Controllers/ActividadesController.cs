using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ManagerActivitiesSportsSchools.Domain.Entities;
using ManagerActivitiesSportsSchools.Infrastructure.Context;

namespace ManagerActivitiesSportsSchools.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ActividadesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ActividadesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Actividades
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Actividad>>> GetActividades()
        {
            return await _context.Actividades.ToListAsync();
        }

        // GET: api/Actividades/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Actividad>> GetActividad(int id)
        {
            var actividad = await _context.Actividades.FindAsync(id);

            if (actividad == null)
            {
                return NotFound();
            }

            return actividad;
        }

        // POST: api/Actividades
        [HttpPost]
        public async Task<ActionResult<Actividad>> PostActividad(Actividad actividad)
        {
            _context.Actividades.Add(actividad);
            await _context.SaveChangesAsync();

            return CreatedAtAction(
                nameof(GetActividad),
                new { id = actividad.Id },
                actividad);
        }

        // PUT: api/Actividades/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutActividad(
            int id,
            Actividad actividad)
        {
            if (id != actividad.Id)
            {
                return BadRequest();
            }

            _context.Entry(actividad).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ActividadExists(id))
                {
                    return NotFound();
                }

                throw;
            }

            return NoContent();
        }

        // DELETE: api/Actividades/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActividad(int id)
        {
            var actividad = await _context.Actividades.FindAsync(id);

            if (actividad == null)
            {
                return NotFound();
            }

            _context.Actividades.Remove(actividad);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ActividadExists(int id)
        {
            return _context.Actividades.Any(e => e.Id == id);
        }
    }
}