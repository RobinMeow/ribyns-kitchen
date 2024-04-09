namespace Common.Constraints;

public sealed record ValidationField
{
    public ValidationField(string name, string dataType)
    {
        Name = name;
        DataType = dataType;
    }

    public string Name { get; }

    public string DataType { get; set; }

    public List<Constraint> Constraints { get; set; } = new List<Constraint>();
}
