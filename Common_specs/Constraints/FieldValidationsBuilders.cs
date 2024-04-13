using Common.Constraints;

namespace Common_specs.Constraints;

public sealed class FieldValidationsBuilders
{
    [Fact]
    public void Build_WithNoFields_ReturnsEmptyArray()
    {
        Empty(new FieldValidationsBuilder().Build());
    }

    [Fact]
    public void Build__with_single_Field_and_Constraint_returns_single_FieldValidations()
    {
        var builder = new FieldValidationsBuilder()
            .AddField("Name", "string")
            .WithConstraint(Validation.Required);

        FieldValidations[] actual = builder.Build();

        Single(actual);
        Equal("name", actual[0].Name);
        Equal("string", actual[0].DataType);
        Single(actual[0].Constraints);
        Equal(Validation.Required, actual[0].Constraints[0].Validation);
        Null(actual[0].Constraints[0].Value);
    }

    [Fact]
    public void Build_with_multiple_fields_and_constraints_returns_multiple_FieldValidations()
    {
        var builder = new FieldValidationsBuilder()
            .AddField("Name", "string")
            .WithConstraint(Validation.Required)
            .AddField("Age", "number")
            .WithConstraint(Validation.Required);

        FieldValidations[] actual = builder.Build();

        Equal(2, actual.Length);

        FieldValidations nameValidations = actual[1];
        Equal("name", nameValidations.Name);
        Equal("string", nameValidations.DataType);

        Single(nameValidations.Constraints);
        Constraint nameConstraint = nameValidations.Constraints[0];
        Equal(Validation.Required, nameConstraint.Validation);
        Null(nameConstraint.Value);

        FieldValidations ageValiadtions = actual[0];
        Equal("age", ageValiadtions.Name);
        Equal("number", ageValiadtions.DataType);

        Single(ageValiadtions.Constraints);
        Constraint ageConstraint = ageValiadtions.Constraints[0];
        Equal(Validation.Required, ageConstraint.Validation);
        Null(ageConstraint.Value);
    }

    [Fact]
    public void WithConstraint_WithoutField_ThrowsInvalidOperationException()
    {
        var builder = new FieldValidationsBuilder();
        Throws<InvalidOperationException>(() => builder.WithConstraint(Validation.Required));
    }
}
