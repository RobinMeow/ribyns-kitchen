using Domain;

namespace Domain_specs.EntityId_specs;

public sealed class New
{
    [Fact]
    public void returns_a_valid_id()
    {
        EntityId entityId = EntityId.New();

        NotNull(entityId.Id);
        False(String.IsNullOrWhiteSpace(entityId.Id));
        True(GuidEntityIdSpecification.IsValidGuidFormat(entityId.Id));
        False(GuidEntityIdSpecification.IsDisallowedId(entityId.Id));
    }
}
