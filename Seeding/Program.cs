using System.Text;
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
    static readonly Faker _faker = new ("de");
    static MongoDatabase _mongodb = null!;
    static bool _ci = false;
    // e2e will not work with a different seed
    const int _e2e_seed = 20250517;

    static async Task Main(string[] args) // TODO allow different seed
    {
        try
        {
            Randomizer.Seed = new Random(_e2e_seed);
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

                    if (args.Length <= nextIndex) return true; // flag is used as standalone

                    return args[nextIndex].StartsWith("-")  // if true: flag is used as standalone-true
                    || bool.Parse(args[nextIndex]);
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

                    if (args.Length <= nextIndex) return true; // flag is used as standalone

                    return args[nextIndex].StartsWith("-")  // if true: flag is used as standalone-true
                    || bool.Parse(args[nextIndex]);
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

    public static Guid GenerateGuidFromSeed(int seed, int index)
    {
        using (var sha1 = System.Security.Cryptography.SHA1.Create())
        {
            byte[] seedBytes = Encoding.UTF8.GetBytes(seed.ToString() + index.ToString());
            byte[] hash = sha1.ComputeHash(seedBytes);

            // Create a GUID from the first 16 bytes of the hash
            hash[6] = (byte)((hash[6] & 0x0F) | 0x50); // Version 5
            hash[8] = (byte)((hash[8] & 0x3F) | 0x80); // Variant

            return new Guid(hash[..16]);
        }
    }

    static Chef FakeChef(int index, string? name = null, string? email = null)
    {
        var chef = new Chef()
        {
            Id = new EntityId(GenerateGuidFromSeed(_e2e_seed, index).ToString()),
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
