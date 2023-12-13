using api.Domain;

namespace server.tests.entitiyId;

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
