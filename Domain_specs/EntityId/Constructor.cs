using Domain;

namespace Domain_specs.EntityId_specs;

public sealed class Constructor : _testData
{
    [Theory]
    [InlineData(null)]
    [InlineData("")]
    [InlineData(" ")]
    public void throws_ArgumentException_on_NullOrWhiteSpace_id(string id)
    {
        Throws<ArgumentException>(() => new EntityId(id));
    }

    [Theory]
    [MemberData(nameof(GetDisallowedIds))]
    public void detects_disallowed_ids(string disallowedId)
    {
        True(GuidEntityIdSpecification.IsDisallowedId(disallowedId));
    }

    [Theory]
    [MemberData(nameof(GetInvalidIds))]
    public void detects_invalid_id(string invalidId)
    {
        False(GuidEntityIdSpecification.IsValidGuidFormat(invalidId));
    }

    [Fact]
    public void converts_valid_uppercase_id_to_lowercase_silently()
    {
        string validId = "ABCDABCD-1234-ABCD-1234-123456789ABC";

        EntityId entityId = new EntityId(validId);

        Equal(validId.ToLower(), entityId.Id);
    }
}
