using Application.Recipes;
using Bogus;
using Domain;
using Infrastructure;
using Infrastructure.MongoDB;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Seeding;

internal class Program
{
    private const int AmountFakeRecipes = 55;
    private const string DatabaseName = "gkb";
    private const string CollectionName = "recipes";

    public static async Task Main(string[] args)
    {
        int port = args.Length > 0 ? int.Parse(args[0]) : 27020;
        string connectionString = $"mongodb://127.0.0.1:{port}";
        var client = new MongoClient(connectionString);
        var database = client.GetDatabase(DatabaseName);
        var collection = database.GetCollection<Recipe>(RecipeCollection.Name);

        var mongodb = new MongoDatabase(connectionString);
        var recipeCollection = new RecipeCollection(mongodb);
        Console.ForegroundColor = ConsoleColor.Green;
        Console.WriteLine("Connected to MongoDB");
        Console.ResetColor();

        // Seed recipes
        for (int i = 0; i < AmountFakeRecipes; i++)
        {
            var fakeRecipe = GenerateFakeRecipe();
            await recipeCollection.AddAsync(fakeRecipe);
        }

        Console.ForegroundColor = ConsoleColor.Green;
        Console.WriteLine($"SEEDING COMPLETED: Created {AmountFakeRecipes} fake recipes. Press any key to exit.");
        Console.ResetColor();
        Console.ReadKey();
    }

    private static Recipe GenerateFakeRecipe()
    {
        var faker = new Faker("de");
        return new NewRecipeRequest()
        {
            Name = faker.Commerce.ProductName(),
        }.ToRecipe();
    }
}
