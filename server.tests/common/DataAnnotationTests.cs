using System.ComponentModel.DataAnnotations;

namespace server.tests;

public abstract class DataAnnotationTests
{
    protected static IList<ValidationResult> ValidationResults(object model)
    {
        var validationResults = new List<ValidationResult>();
        var ctx = new ValidationContext(model, null, null);
        Validator.TryValidateObject(model, ctx, validationResults, true);
        return validationResults;
    }

    //protected static int ValidateAmountFailed(object dto)
    //{
    //    IList<ValidationResult> validationResults = ValidateModel(dto);
    //    int invalidMembers = validationResults.Where(vr => vr.MemberNames.Any()).Count();
    //    return invalidMembers;
    //}

    protected static bool HasInvalidMember(IList<ValidationResult> validationResults, string memberName)
    {
        return validationResults.Any(vr => vr.MemberNames.Contains(memberName));
    }
}
