using System.Linq;
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
    static bool _ci = false;

    static async Task Main(string[] args)
    {
        try
        {
            Randomizer.Seed = new Random(20250517);
            Console.ForegroundColor = ConsoleColor.Green;
            
            Func<int> getPort = () => 
            {
                for (int i = 0; i < args.Length; i++)
                    if (args[i] == "--port" || args[i] == "-p")
                        return int.Parse(args[i + 1]);

                return 27020;
            };

            Func<bool> isCI = () =>
            {
                for (int i = 0; i < args.Length; i++)
                {
                    if (args[i] != "--ci") continue;

                    int nextIndex = i + 1;

                    if (args.Length <= nextIndex) return true; // --ci is used as standalone flag

                    return args[nextIndex].StartsWith("-") || bool.Parse(args[nextIndex]);
                }

                return false;
            };
            _ci = isCI();

            Func<bool> isOnlyDrop = () =>
            {
                for (int i = 0; i < args.Length; i++)
                {
                    if (args[i] != "--only-drop") continue;

                    int nextIndex = i + 1;

                    if (args.Length <= nextIndex) return true; // --ci is used as standalone flag

                    return args[nextIndex].StartsWith("-") || bool.Parse(args[nextIndex]);
                }

                return false;
            };

            string connectionString = $"mongodb://127.0.0.1:{getPort()}";

            Console.WriteLine($"Connecting to MongoDB on {connectionString}");
            _mongodb = new MongoDatabase(connectionString);

            string dbName = Globals.AppNameTech.ToLower();
            Console.WriteLine($"Dropping database '{dbName}'.");
            await _mongodb.Database.Client.DropDatabaseAsync(dbName);

            if (isOnlyDrop())
            {
                Console.WriteLine($"Database dropped.");
                return;
            }

            await SeedChefAsync();
            Console.Write("\n");
            await SeedRecipesAsync();

            Console.WriteLine($"\nSeeding done.");
        }
        catch(Exception ex)
        {
            Console.ForegroundColor = ConsoleColor.Red;
            Console.WriteLine(ex.ToString());
        }
        finally
        {
            Console.ResetColor();
        }
    }

    static async ValueTask SeedChefAsync()
    {

        var chefCollection = new ChefCollection(_mongodb);

        Console.WriteLine($"SEEDING admin");
        await chefCollection.AddAsync(FakeChef(name: "admin", email: "admin@ribyn.dev"));
        Console.WriteLine($"SEEDING casual user 'Ribyn'");
        await chefCollection.AddAsync(FakeChef(name: "Ribyn", email: "ribyn@ribyn.dev"));

        var count = _ci ? CHEF_COUNT * 0.1 : CHEF_COUNT;
        Console.Write($"SEEDING: 0/{count}");
        for (int i = 0; i < count; i++)
        {
            await chefCollection.AddAsync(FakeChef());

            Console.SetCursorPosition(0, Console.CursorTop);
            Console.Write($"SEEDING: {i + 1}/{count}");
        }
    }

    static Chef FakeChef(string? name = null, string? email = null)
    {
        var chef = new Chef()
        {
            Id = EntityId.New(),
            Name = name ??= _faker.Internet.UserName(),
            Email = email ?? _faker.Internet.Email(),
        };
        chef.SetPassword(name, _passwordHasher);
        return chef;
    }

    static async ValueTask SeedRecipesAsync()
    {
        var recipeCollection = new RecipeCollection(_mongodb);
        int recipeCount = CHEF_COUNT * (_ci ? 10 : 50);
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
