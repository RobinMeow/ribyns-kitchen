using Application.Recipes;
using Bogus;
using Common;
using Domain;
using Infrastructure;
using Infrastructure.MongoDB;

namespace Seeding;

internal class Program
{
    static IPasswordHasher _passwordHasher = new AspPasswordHasher();
    static readonly Faker _faker = new ("de");
    static MongoDatabase _mongodb = null!;
    const int CHEF_COUNT = 50;
    static async Task Main(string[] args)
    {
        try
        {
            Randomizer.Seed = new Random(20250517);
            Console.ForegroundColor = ConsoleColor.Green;

            int port = args.Length > 0 ? int.Parse(args[0]) : 27020;
            string connectionString = $"mongodb://127.0.0.1:{port}";

            Console.WriteLine($"Connecting to MongoDB on {connectionString}");
            _mongodb = new MongoDatabase(connectionString);

            string dbName = Globals.AppNameTech.ToLower();
            Console.WriteLine($"Dropping database '{dbName}'.");
            await _mongodb.Database.Client.DropDatabaseAsync(dbName);


            await SeedChefAsync();
            Console.Write("\n");
            await SeedRecipesAsync();

            Console.WriteLine($"\nSEEDING COMPLETED. Press any key to exit.");
        }
        catch(Exception ex)
        {
            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine(ex.ToString());
        }
        finally
        {
            Console.ResetColor();
            Console.ReadKey();
        }
    }

    static async ValueTask SeedChefAsync()
    {

        var chefCollection = new ChefCollection(_mongodb);

        Console.WriteLine($"SEEDING admin");
        await chefCollection.AddAsync(FakeChef(name: "admin", email: "admin@ribyn.dev"));
        Console.WriteLine($"SEEDING casual user 'Ribyn'");
        await chefCollection.AddAsync(FakeChef(name: "Ribyn", email: "ribyn@ribyn.dev"));

        Console.Write($"SEEDING: 0/{CHEF_COUNT}");
        for (int i = 0; i < CHEF_COUNT; i++)
        {
            await chefCollection.AddAsync(FakeChef());

            Console.SetCursorPosition(0, Console.CursorTop);
            Console.Write($"SEEDING: {i + 1}/{CHEF_COUNT}");
        }
    }

    static Chef FakeChef(string? name = null, string? email = null)
    {
        var chef = new Chef()
        {
            Id = EntityId.New(),
            Name = name ??= _faker.Person.UserName,
            Email = email ?? _faker.Person.Email,
        };
        chef.SetPassword(name, _passwordHasher);
        return chef;
    }

    static async ValueTask SeedRecipesAsync()
    {
        var recipeCollection = new RecipeCollection(_mongodb);
        const int recipeCount = CHEF_COUNT * 50; // like in: each chef has 50 recipes (TODO make more realistic and make 5-100 randomized)
        Console.Write($"SEEDING: 0/{recipeCount}");
        for (int i = 0; i < recipeCount; i++)
        {
            var fakeRecipe = FakeRecipe();
            await recipeCollection.AddAsync(fakeRecipe);

            Console.SetCursorPosition(0, Console.CursorTop);
            Console.Write($"SEEDING: {i + 1}/{recipeCount}");
        }
    }

    static Recipe FakeRecipe()
    {
        return new NewRecipeRequest()
        {
            Name = _faker.Commerce.ProductName(),
        }.ToRecipe();
    }
}
