using Microsoft.AspNetCore.Mvc;
using ManagerActivitiesSportsSchools.Application.Contract;
using ManagerActivitiesSportsSchools.Application.Dtos.Jugador;

namespace ManagerActivitiesSportsSchools.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class JugadoresController : ControllerBase
    {
        private readonly IJugadorService _service;

        public JugadoresController(IJugadorService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var jugadores = await _service.GetAllAsync();
            return Ok(jugadores);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var jugador = await _service.GetByIdAsync(id);

            if (jugador == null)
                return NotFound();

            return Ok(jugador);
        }

        [HttpPost]
        public async Task<IActionResult> Post(SaveJugadorDto dto)
        {
            await _service.CreateAsync(dto);
            return Ok("Jugador creado correctamente.");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, SaveJugadorDto dto)
        {
            await _service.UpdateAsync(id, dto);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _service.DeleteAsync(id);
            return NoContent();
        }
    }
}