using Microsoft.EntityFrameworkCore;
using ManagerActivitiesSportsSchools.Infrastructure.Context;
using ManagerActivitiesSportsSchools.Infrastructure.Repositories;
using ManagerActivitiesSportsSchools.Application.Contract;
using ManagerActivitiesSportsSchools.Application.Service;
using ManagerActivitiesSportsSchools.Domain.Repositories;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact", policy =>
    {
        policy
            .AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services.AddScoped<IEquipoRepository, EquipoRepository>();
builder.Services.AddScoped<IJugadorRepository, JugadorRepository>();

builder.Services.AddScoped<IEquipoService, EquipoService>();
builder.Services.AddScoped<IJugadorService, JugadorService>();

builder.Services.AddControllers();

builder.Services.AddEndpointsApiExplorer();

builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("DefaultConnection"));
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowReact");

// app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();