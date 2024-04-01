using api.Domain;

namespace api.tests.EntityId_specs;

public sealed class ToString
{
    [Fact]
    public void returns_id()
    {
        string validId = "12345678-1234-1234-1234-123456789abc";
        EntityId entityId = new EntityId(validId);

        string actual = entityId.ToString();

        Equal(validId, actual);
    }
}
