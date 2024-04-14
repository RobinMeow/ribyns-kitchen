namespace Common.Validations;

public sealed record FieldConstraints
{
    public bool IsRequired { get; set; } = false;

    /// <summary>
    /// min and max properties are used for both, strings and numbers.
    /// </summary>
    public uint? Min { get; set; } = null;

    public uint? Max { get; set; } = null;
}
