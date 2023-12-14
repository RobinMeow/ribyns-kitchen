using api.Domain;

namespace server.tests.IsoDateTime_conversion_tests;

public sealed class Now
{
    [Fact]
    public void Now_returns_current_DateTime()
    {
        DateTime actual = IsoDateTime.Now;
        DateTime utcNow = DateTime.UtcNow;
        Equal(utcNow, actual, TimeSpan.FromMilliseconds(100)); // if this fails, try increasing the milliseconds. But dont go too far.
    }

    [Fact]
    public void Now_returns_Utc()
    {
        DateTime actual = IsoDateTime.Now;
        Equal(DateTimeKind.Utc, actual.Kind);
    }
}
