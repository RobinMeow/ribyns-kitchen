namespace Domain;

public abstract class Entity
{
    public required EntityId Id { get; set; }

    public DateTime CreatedAt { get; set; }
}
