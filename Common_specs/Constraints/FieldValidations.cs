using Common.Constraints;

namespace Common_specs.Constraints;

public sealed class FieldValiadtions_specs
{
    [Fact]
    public void Ctor_should_trim_first_letter_of_name_to_lower_case()
    {
        var fieldValidations = new FieldValidations("NAME", "string", []);
        Equal("nAME", fieldValidations.Name);
    }
}
