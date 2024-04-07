namespace api.tests.common;

public sealed class StringRangeTests
{
    [Fact]
    public void minimum_is_inclusive()
    {
        var stringRangeAttr = new StringRangeAttribute(0, 1);
        True(stringRangeAttr.IsValid(""));
    }

    [Fact]
    public void maximum_is_inclusive()
    {
        var stringRangeAttr = new StringRangeAttribute(0, 1);
        True(stringRangeAttr.IsValid("x"));
        False(stringRangeAttr.IsValid("xx"));
    }
}
