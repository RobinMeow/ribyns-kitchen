namespace api.Domain;

public abstract class Entity
{
    public Entity()
    {
    }

    // Initially there was no setter, but MongoDb depends on it. Semms to work with private tho, unlike EFCore.
    public EntityId Id { get; private set; } = EntityId.New();

    public abstract int ModelVersion { get; init; } // start at zero, so the version is also the amount of times, it was changed :)

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
