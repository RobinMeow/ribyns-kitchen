namespace Common.Validations;

public sealed record FieldName
{
    private readonly string _name;

    public FieldName(string name)
    {
        // convert first character to lower case
        ReadOnlySpan<char> span = name.AsSpan();

        if (span.Length == 0)
            throw new ArgumentException("Name may not ben null or whitespace.", nameof(name));

        _name = char.ToLowerInvariant(span[0]) + span.Slice(1).ToString();
    }

    public override string ToString()
    {
        return _name;
    }
}
