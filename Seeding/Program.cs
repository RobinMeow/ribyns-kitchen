using Application.Recipes;
using Bogus;
using Domain;
using Infrastructure.MongoDB;

namespace Seeding;

internal class Program
{
    private static RecipeCollection _recipeCollection = null!;
    private static ChefCollection _chefCollection = null!;
    private static Faker _faker = new ("de");

    public static async Task Main(string[] args)
    {
        try
        {
            Console.ForegroundColor = ConsoleColor.Green;

            int port = args.Length > 0 ? int.Parse(args[0]) : 27020;
            string connectionString = $"mongodb://127.0.0.1:{port}";

            Console.WriteLine($"Connecting to MongoDB on {connectionString}");
            var mongodb = new MongoDatabase(connectionString);

            string dbName = Common.Globals.AppNameTech.ToLower();
            Console.WriteLine($"Dropping database '{dbName}'.");
            await mongodb.Database.Client.DropDatabaseAsync(dbName);

            _recipeCollection = new RecipeCollection(mongodb);
            _chefCollection = new ChefCollection(mongodb);

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

    private static IPasswordHasher _passwordHasher = new Infrastructure.AspPasswordHasher();
    private const int CHEF_COUNT = 50;
    private static async Task SeedChefAsync()
    {

        Console.WriteLine($"SEEDING admin");
        await _chefCollection.AddAsync(FakeChef(username: "admin", email: "admin@ribyn.dev"));
        Console.WriteLine($"SEEDING casual user 'Ribyn'");
        await _chefCollection.AddAsync(FakeChef(username: "Ribyn", email: "ribyn@ribyn.dev"));

        Console.Write($"SEEDING: 0/{CHEF_COUNT}");
        for (int i = 0; i < CHEF_COUNT; i++)
        {
            await _chefCollection.AddAsync(FakeChef());

            Console.SetCursorPosition(0, Console.CursorTop);
            Console.Write($"SEEDING: {i + 1}/{CHEF_COUNT}");
        }
    }

    private static Chef FakeChef(string? username = null, string? email = null)
    {
        username ??= _faker.Person.UserName;
        email ??= _faker.Person.Email;
        var chef = new Chef()
        {
            Id = EntityId.New(),
            Name = _faker.Person.UserName,
            Email = _faker.Person.Email,
        };
        chef.SetPassword(_faker.Person.UserName, _passwordHasher);
        return chef;
    }

    private static async ValueTask SeedRecipesAsync()
    {
        const int recipeCount = CHEF_COUNT * 50; // like in: each chef has 50 recipes (TODO make more realistic and make 5-100 randomized)
        Console.Write($"SEEDING: 0/{recipeCount}");
        for (int i = 0; i < recipeCount; i++)
        {
            var fakeRecipe = FakeRecipe();
            await _recipeCollection.AddAsync(fakeRecipe);

            Console.SetCursorPosition(0, Console.CursorTop);
            Console.Write($"SEEDING: {i + 1}/{recipeCount}");
        }
    }

    private static Recipe FakeRecipe()
    {
        return new NewRecipeRequest()
        {
            Name = _faker.Commerce.ProductName(),
        }.ToRecipe();
    }
}
