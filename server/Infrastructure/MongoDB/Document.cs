namespace api.Infrastructure.MongoDB;

public abstract record Document
{
    public required string Id { get; set; }

    /// <summary>
    /// when creating a new model, set the first value to zero.
    /// </summary>
    public abstract ushort ModelVersion { get; set; }

    public DateTime CreatedAt { get; set; }
}
