using System.Runtime.InteropServices.ComTypes;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

namespace MattyBlog.Middleware
{
    public class RequestLoggerMiddleware
    {
        private readonly RequestDelegate nextRequestDelegate;
        private readonly ILogger logger;

        public RequestLoggerMiddleware(RequestDelegate nextRequestDelegate, ILoggerFactory loggerFactory)
        {
            this.nextRequestDelegate = nextRequestDelegate;
            this.logger = loggerFactory.CreateLogger<RequestLoggerMiddleware>();
        }

        public async Task Invoke(HttpContext context)
        {
            this.logger.LogInformation("Handling Request Path " + context.Request.Path);
            await nextRequestDelegate.Invoke(context);
            this.logger.LogInformation("Finishing handling request " + context.Request.Path);
        }
    }
}