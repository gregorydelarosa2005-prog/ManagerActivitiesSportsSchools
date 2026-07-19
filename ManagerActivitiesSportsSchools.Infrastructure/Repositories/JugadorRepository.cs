using System;
using System.Collections.Generic;
using System.Text;

using Microsoft.EntityFrameworkCore;
using ManagerActivitiesSportsSchools.Domain.Entities;
using ManagerActivitiesSportsSchools.Infrastructure.Context;
using ManagerActivitiesSportsSchools.Domain.Repositories;

namespace ManagerActivitiesSportsSchools.Infrastructure.Repositories
{
    public class JugadorRepository : IJugadorRepository
    {
        private readonly ApplicationDbContext _context;

        public JugadorRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<Jugador>> GetAllAsync()
        {
            return await _context.Jugadores.ToListAsync();
        }

        public async Task<Jugador?> GetByIdAsync(int id)
        {
            return await _context.Jugadores.FindAsync(id);
        }

        public async Task AddAsync(Jugador jugador)
        {
            await _context.Jugadores.AddAsync(jugador);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Jugador jugador)
        {
            _context.Jugadores.Update(jugador);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var jugador = await _context.Jugadores.FindAsync(id);

            if (jugador != null)
            {
                _context.Jugadores.Remove(jugador);
                await _context.SaveChangesAsync();
            }
        }
    }
}