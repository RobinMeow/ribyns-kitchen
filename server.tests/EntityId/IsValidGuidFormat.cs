using api.Domain;

namespace api.tests.EntityId_specs;

public sealed class IsValidGuidFormat : _testData
{
    [Theory]
    [MemberData(nameof(GetAnyIdWithCorrectFormat))]
    public void returns_true_for_ids_with_valid_format(string validId)
    {
        bool isValid = GuidEntityIdSpecification.IsValidGuidFormat(validId);

        True(isValid);
    }

    public static IEnumerable<object[]> GetAnyIdWithCorrectFormat()
    {
        yield return new []{ "12345678-1234-1234-1234-123456789abc" }; // lowercase (correct and allowed)
        yield return new []{ "ABCDABCD-1234-1234-1234-123456789ABC" }; // uppercase (correct and allowed)

        IEnumerable<object[]> disallowedIds = GetDisallowedIds();
        foreach (object[] disallowedId in disallowedIds)
            yield return disallowedId;
    }

    [Theory]
    [MemberData(nameof(GetInvalidIds))]
    public void returns_false_for_ids_with_valid_format_but_invalid_hex_digits(string validId)
    {
        bool isValid = GuidEntityIdSpecification.IsValidGuidFormat(validId);

        False(isValid);
    }

    [Theory]
    [MemberData(nameof(GetIdsWithInvalidFormat))]
    public void returns_false_for_ids_with_invalid_format(string id)
    {
        bool isValid = GuidEntityIdSpecification.IsValidGuidFormat(id);

        False(isValid);
    }

    public static IEnumerable<object[]> GetIdsWithInvalidFormat()
    {
        yield return new object[] { null! };
        yield return new [] { "" };
        yield return new [] { " " };
        yield return new [] { "invalid" };
        yield return new [] { "00000000-0000-0000-0000-00000000000G" };
        yield return new [] { "00000000000000000000000000000000" };
        yield return new [] { "000000000000000" };
        yield return new [] { "(00000000-0000-0000-0000-000000000000)" };
        yield return new [] { "{00000000-0000-0000-0000-000000000000}" };
    }
}
