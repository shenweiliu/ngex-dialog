using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;

namespace SW.NgTestCore.Web
{
    public class Program
    {
        public static void Main(string[] args)
        {
            //Use minimal hosting model.
            var builder = WebApplication.CreateBuilder(args);

            var startup = new Startup(builder.Environment);
            startup.ConfigureServices(builder.Services);

            var app = builder.Build();
            
            using var scope = app.Services.CreateScope();
            var services = scope.ServiceProvider;
            var loggerFactory = services.GetRequiredService<ILoggerFactory>();
            startup.Configure(app, loggerFactory);
                        
            app.Run();
        }

        
    }
}
