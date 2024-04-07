using Domain;

namespace api.tests.EntityId_specs;

public sealed class string_conversion
{
    [Fact]
    public void returns_currect_id_string()
    {
        string validId = "12345678-1234-1234-1234-123456789abc";
        EntityId entityId = new EntityId(validId);

        string actual = entityId.ToString();

        Equal(validId, actual);
    }

    [Fact]
    public void is_case_sensitive()
    {
        string validId = "12345678-1234-1234-1234-123456789abc";
        EntityId entityId = new EntityId(validId);

        string actual = entityId.ToString();

        NotEqual(validId.ToUpper(), actual);
    }
}
