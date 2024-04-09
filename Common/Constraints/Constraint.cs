namespace Common.Constraints;

public sealed record Constraint
{
    public Constraint(Validation validator, object value)
    {
        Validator = validator;
        Value = value;
    }

    public Validation Validator { get; set; }
    public object Value { get; set; }
}
