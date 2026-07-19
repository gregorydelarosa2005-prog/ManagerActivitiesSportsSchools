using Microsoft.EntityFrameworkCore;
using ManagerActivitiesSportsSchools.Infrastructure.Context;
using ManagerActivitiesSportsSchools.Infrastructure.Interfaces;
using ManagerActivitiesSportsSchools.Infrastructure.Repositories;


var builder = WebApplication.CreateBuilder(args);


builder.Services.AddScoped<IEquipoRepository, EquipoRepository>();
builder.Services.AddScoped<IJugadorRepository, JugadorRepository>();


// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection"));
});

var app = builder.Build();

// Configure the HTTP request pipeline.

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();