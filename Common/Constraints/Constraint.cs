namespace Common.Constraints;

public sealed record Constraint
{
    public Constraint(Validation validation, object? value)
    {
        Validation = validation;
        Value = value;
    }

    public Validation Validation { get; set; }
    public object? Value { get; set; }
}
