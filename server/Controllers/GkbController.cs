using Microsoft.AspNetCore.Mvc;

namespace api.Controllers;

public abstract class GkbController : ControllerBase
{
    protected static string CreateErrorMessage(string controllerName, string methodName)
    {
        return $"In {controllerName} On {methodName}";
    }
}
