namespace Common.Constraints;

public sealed record FieldValidations
{
    public FieldValidations(string name, string dataType, Constraint[] constraints)
    {
        // convert first character to lower case
        ReadOnlySpan<char> span = name.AsSpan();

        if (span.Length == 0)
            throw new ArgumentException("Name may not ben null or whitespace.", nameof(name));

        Name = char.ToLowerInvariant(span[0]) + span.Slice(1).ToString();
        DataType = dataType;
        Constraints = constraints;
    }

    public string Name { get; }

    public string DataType { get; set; }

    public Constraint[] Constraints { get; set; }
}
