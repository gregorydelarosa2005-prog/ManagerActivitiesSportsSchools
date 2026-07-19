using Microsoft.AspNetCore.Mvc;
using ManagerActivitiesSportsSchools.Application.Contract;
using ManagerActivitiesSportsSchools.Application.Dtos.Equipo;

namespace ManagerActivitiesSportsSchools.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EquiposController : ControllerBase
    {
        private readonly IEquipoService _service;

        public EquiposController(IEquipoService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var equipos = await _service.GetAllAsync();
            return Ok(equipos);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var equipo = await _service.GetByIdAsync(id);

            if (equipo == null)
                return NotFound();

            return Ok(equipo);
        }

        [HttpPost]
        public async Task<IActionResult> Post(SaveEquipoDto dto)
        {
            await _service.CreateAsync(dto);
            return Ok("Equipo creado correctamente.");
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, SaveEquipoDto dto)
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