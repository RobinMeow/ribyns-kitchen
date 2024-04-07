using System.Net.Mime;
using Microsoft.AspNetCore.Mvc;
using Domain;
using Infrastructure.MongoDB;
using Infrastructure;

namespace Application;

internal class Program
{
    static void Main(string[] args)
    {
        WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

        builder.Services.Configure<PersistenceSettings>(builder.Configuration.GetSection(nameof(PersistenceSettings)));

        builder.Services.AddControllers(options =>
        {
            options.Filters.Add(new ProducesAttribute(MediaTypeNames.Application.Json));
            options.Filters.Add(new ConsumesAttribute(MediaTypeNames.Application.Json));
        });
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();

        builder.Services.AddSwaggerStuff();
        builder.Services.AddJwtAuthetication(builder.Configuration);
        builder.Services.AddExceptionHandler<ExceptionHandler>();
        builder.AddFrontEndOriginsCors();

        // Transient: instance per code request. Scoped: instance per HTTP request
        builder.Services.AddSingleton<MongoDatabase>();
        builder.Services.AddSingleton<RecipeCollection>();
        builder.Services.AddSingleton<IRecipeCollection, RecipeCollection>();
        builder.Services.AddSingleton<IRecipeRepository, RecipeCollection>();
        builder.Services.AddSingleton<IChefRepository, ChefCollection>();

        WebApplication app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI((o) =>
            {
                o.DisplayOperationId();
            });
        }

        app.UseCors();
        app.UseAuthentication();
        app.UseAuthorization();
        app.UseExceptionHandler((_) => { });
        app.MapControllers();

        app.Run();
    }
}
