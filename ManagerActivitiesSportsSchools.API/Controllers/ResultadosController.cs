using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ManagerActivitiesSportsSchools.Infrastructure.Context;
using ManagerActivitiesSportsSchools.Domain.Entities;

namespace ManagerActivitiesSportsSchools.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ResultadosController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ResultadosController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Resultados
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Resultado>>> GetResultados()
        {
            return await _context.Resultados.ToListAsync();
        }

        // GET: api/Resultados/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Resultado>> GetResultado(int id)
        {
            var resultado = await _context.Resultados.FindAsync(id);

            if (resultado == null)
            {
                return NotFound();
            }

            return resultado;
        }

        // POST: api/Resultados
        [HttpPost]
        public async Task<ActionResult<Resultado>> PostResultado(Resultado resultado)
        {
            _context.Resultados.Add(resultado);
            await _context.SaveChangesAsync();

            return CreatedAtAction(
                nameof(GetResultado),
                new { id = resultado.Id },
                resultado
            );
        }

        // PUT: api/Resultados/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutResultado(
            int id,
            Resultado resultado)
        {
            if (id != resultado.Id)
            {
                return BadRequest();
            }

            _context.Entry(resultado).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ResultadoExists(id))
                {
                    return NotFound();
                }

                throw;
            }

            return NoContent();
        }

        // DELETE: api/Resultados/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteResultado(int id)
        {
            var resultado = await _context.Resultados.FindAsync(id);

            if (resultado == null)
            {
                return NotFound();
            }

            _context.Resultados.Remove(resultado);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ResultadoExists(int id)
        {
            return _context.Resultados.Any(e => e.Id == id);
        }
    }
}