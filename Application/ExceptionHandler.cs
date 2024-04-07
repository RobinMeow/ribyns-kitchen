namespace Application;

public sealed class ExceptionHandler : Microsoft.AspNetCore.Diagnostics.IExceptionHandler
{
    public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
    {
        httpContext.Response.StatusCode = StatusCodes.Status500InternalServerError;
        // its already logged, but I dont know where or why
        //_logger.LogError("{ExceptionMessage}", exception.Message);
        await httpContext.Response.WriteAsJsonAsync(new { Error = "Ein unerwarteter Fehler ist aufgetreten." }, cancellationToken);
        return true;
    }
}
