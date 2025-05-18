using Application.Recipes;
using Bogus;
using Common;
using Domain;
using Infrastructure;
using Infrastructure.MongoDB;

namespace Seeding;

internal class Program
{
    const int CHEF_COUNT = 50;

    static readonly IPasswordHasher _passwordHasher = new AspPasswordHasher();
    static readonly Faker _faker = new("de");
    static MongoDatabase _mongodb = null!;
    static bool _ci = false;

    static int GetArgValueInt(string[] args, string[] argNames, int defaultValue = -1)
    {
        for (int i = 0; i < args.Length; i++)
            if (argNames.Any(alias => alias == args[i]))
                return int.Parse(args[i + 1]);

        return defaultValue;
    }

    static bool GetArgValueBool(string[] args, string[] argNames)
    {
        for (int i = 0; i < args.Length; i++)
        {
            if (!argNames.Any(alias => alias == args[i])) continue;

            int nextIndex = i + 1;

            if (args.Length <= nextIndex) return true; // flag is used as standalone

            return args[nextIndex].StartsWith("-")  // if true: flag is used as standalone-true
            || bool.Parse(args[nextIndex]); // flag is used with true/false string value
        }

        return false;
    }

    static async Task Main(string[] args)
    {
        try
        {
            Randomizer.Seed = new Random(GetArgValueInt(args, new string[] { "--seed", "-s" }, defaultValue: 20250517));
            Console.ForegroundColor = ConsoleColor.Green;

            _ci = GetArgValueBool(args, new string[] { "--ci" });

            string connectionString = $"mongodb://127.0.0.1:{GetArgValueInt(args, new string[] { "--port", "-p" }, defaultValue: 27020)}";

            Console.WriteLine($"Connecting to MongoDB on {connectionString}");
            _mongodb = new MongoDatabase(connectionString);

            string dbName = Globals.AppNameTech.ToLower();
            Console.WriteLine($"Dropping database '{dbName}'.");
            await _mongodb.Database.Client.DropDatabaseAsync(dbName);

            if (GetArgValueBool(args, new string[] { "--only-drop" }))
            {
                Console.WriteLine($"Database dropped.");
                return;
            }

            await SeedChefAsync();
            Console.Write("\n");
            await SeedRecipesAsync();

            Console.WriteLine($"\nSeeding done.");
        }
        catch (Exception ex)
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
        await chefCollection.AddAsync(FakeChef(-1, name: "admin", email: "admin@ribyn.dev"));
        Console.WriteLine($"SEEDING chef 'Ribyn'");
        await chefCollection.AddAsync(FakeChef(-2, name: "Ribyn", email: "ribyn@ribyn.dev"));

        var count = _ci ? CHEF_COUNT * 0.1 : CHEF_COUNT;
        Console.Write($"SEEDING: 0/{count}");
        for (int i = 0; i < count; i++)
        {
            await chefCollection.AddAsync(FakeChef(i));

            Console.SetCursorPosition(0, Console.CursorTop);
            Console.Write($"SEEDING: {i + 1}/{count}");
        }
    }

    static Chef FakeChef(int index, string? name = null, string? email = null)
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

        // seed recipes, used for e2e testing
        Console.Write($"\nSeeding E2E Recipe 'Pfannenkuchen'");
        await recipeCollection.AddAsync(new Recipe()
        {
            Id = new EntityId("11111111-1111-1111-1111-111111111111"),
            Name = "Pfannenkuchen",
            CreatedAt = DateTime.UtcNow,
        });
        // Id = new EntityId("22222222-2222-2222-2222-222222222222"),
    }

    static Recipe FakeRecipe()
    {
        return new NewRecipeRequest()
        {
            Name = _faker.Commerce.ProductName(),
        }.ToRecipe();
    }
}
