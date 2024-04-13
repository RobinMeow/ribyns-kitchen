namespace Common.Constraints;

public sealed class FieldValidationsBuilder
{
    private readonly Stack<FieldValidations> _fieldValidations = new Stack<FieldValidations>();

    private readonly Stack<Constraint> _lastConstraints = new Stack<Constraint>();
    private string? _lastName = null;
    private string? _lastDataType = null;

    private void TryFinalizeField()
    {
        if (_lastName != null)
        {
            if (_lastConstraints.Count == 0)
            {
                throw new InvalidOperationException($"Do not create {nameof(FieldValidations)} without {nameof(Constraint)}.");
            }

            _fieldValidations.Push(new FieldValidations(_lastName, _lastDataType!, _lastConstraints.ToArray()));
            _lastName = null;
            _lastDataType = null;
            _lastConstraints.Clear();
        }
    }

    public FieldValidationsBuilder AddField(string name, string dataType)
    {
        TryFinalizeField();
        _lastName = name;
        _lastDataType = dataType;

        return this;
    }

    public FieldValidationsBuilder WithConstraint(Validation validation, object? value = null)
    {
        if (_lastName == null)
        {
            throw new InvalidOperationException($"Cannot add {nameof(Constraint)} without calling {nameof(AddField)} first.");
        }

        _lastConstraints.Push(new Constraint(validation, value));
        return this;
    }

    public FieldValidations[] Build()
    {
        TryFinalizeField();
        return _fieldValidations.ToArray();
    }
}
