using api.Domain;

namespace server.tests.EntityId_specs;

public sealed class IsSatisfiedByTests : _testData
{
    [Fact]
    public void returns_true_for_valid_guids()
    {
        True(new GuidEntityIdSpecification().IsSatisfiedBy(Guid.NewGuid().ToString()));
    }

    [Theory]
    [MemberData(nameof(GetInvalidIds))]
    public void returns_false_for_invalid_guids(string invalidGuid)
    {
        False(new GuidEntityIdSpecification().IsSatisfiedBy(invalidGuid));
    }

    [Theory]
    [MemberData(nameof(GetDisallowedIds))]
    public void returns_false_for_disallowed_guids(string disallowedGuid)
    {
        False(new GuidEntityIdSpecification().IsSatisfiedBy(disallowedGuid));
    }
}
