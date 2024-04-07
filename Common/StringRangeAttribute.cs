using System.ComponentModel.DataAnnotations;

namespace Common;

[AttributeUsage(AttributeTargets.Property | AttributeTargets.Field | AttributeTargets.Parameter, AllowMultiple = false)]
public sealed class StringRangeAttribute : StringLengthAttribute
{
    /// <summary>
    /// define inclusive minimum and inclusive maximum character count.
    /// <para>
    /// <code>
    /// [StringRange(0, 1)]
    /// </code>
    /// this one would allow <see cref="string.Empty" /> and "x", but not "xx"
    /// </para>
    /// </summary>
    /// <param name="minimumLength">inclusive</param>
    /// <param name="maximumLength">inclusive</param>
    public StringRangeAttribute(int minimumLength, int maximumLength) : base(maximumLength)
    {
        MinimumLength = minimumLength;
    }
}
