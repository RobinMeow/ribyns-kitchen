namespace Common_specs.Constraints;

public sealed class Constraints_specs
{
    [Fact]
    public void Fail()
    {
        True(false);
    }
}
