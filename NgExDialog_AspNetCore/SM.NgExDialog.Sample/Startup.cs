using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using System.IO;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json.Serialization;

namespace SM.NgExDialog.Sample
{
    public class Startup
    {
        public Startup(IWebHostEnvironment env)
        {
            WebHostEnvironment = env;            
            var configBuilder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = configBuilder.Build();
        }

        internal IWebHostEnvironment WebHostEnvironment { get; set; }        
        internal IConfiguration Configuration { get; set; }

        public void ConfigureServices(IServiceCollection services)
        {
            //test
            //var ta = StaticConfigs.GetConfig("TestConfig1");

            //Register Mvc.ViewFeatures.ITempDataDictionaryFactory.
            services.AddControllersWithViews();

            //Custom IserviceCollection extension for transforming AppConfig items.
            services.TransformAppConfig(WebHostEnvironment);

            //Also make top level configuration available (for EF configuration and access to connection string)
            services.AddSingleton(Configuration); //IConfigurationRoot
            services.AddSingleton<IConfiguration>(Configuration);

            //Add Support for strongly typed Configuration and map to class
            services.AddOptions();
            services.Configure<AppConfig>(Configuration.GetSection("AppConfig"));

            services.Configure<CookiePolicyOptions>(options =>
            {
                // This lambda determines whether user consent for non-essential cookies is needed for a given request.
                options.CheckConsentNeeded = context => true;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });

            //Cors policy is added to controllers via [EnableCors("CorsPolicy")]
            //or .UseCors("CorsPolicy") globally
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder
                        .AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader()                        
                        );
            });
            
            //Add framework services.
            services.AddControllers()
            //Add Microsoft.AspNetCore.Mvc.NewtonsoftJson package and use AddNewtonsoftJson.
            .AddNewtonsoftJson(options =>
            {
                // Use the default property (Pascal) casing
                options.SerializerSettings.ContractResolver = new DefaultContractResolver();

                // Configure a custom converter
                //options.SerializerSettings.Converters.Add(new MyCustomJsonConverter());
            });
        }

        public void Configure(IApplicationBuilder app, ILoggerFactory loggerFactory)
        { 
            //Custom global error handling, logging and reporting.
            //app.ConfigureExceptionHandler();
            if (WebHostEnvironment.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                //app.UseExceptionHandler("/Error");
                app.UseExceptionHandler(errorApp =>
                {
                    errorApp.Run(async context =>
                    {
                        context.Response.StatusCode = 500;
                        context.Response.ContentType = "text/plain";
                        var errorFeature = context.Features.Get<IExceptionHandlerFeature>();
                        //Temp disabled.
                        if (errorFeature != null)
                        {                            
                            var logger = loggerFactory.CreateLogger("Global exception logger");
                            logger.LogError(500, errorFeature.Error, errorFeature.Error.Message);
                        }
                        await context.Response.WriteAsync("There was an error");
                    });
                });
            }

            //index.html is not required
            //app.UseDefaultFiles();

            ////Load server MVC controller initially.
            ////Also need to remove "index.html" from Project Perperties > debug lauching profile > Url
            //app.Use(async (context, next) =>
            //{
            //    await next(); // then hit by the INCOMING request do nothing but pass the request to the next middleware (DefaultFiles)

            //    // Then hit by the OUTGOING request test if the application have matched any resource
            //    // - if a resource was found (200 Ok) then do nothing but let the request travel further out
            //    if (context.Response.StatusCode == 404 && !Path.HasExtension(context.Request.Path.Value))
            //    {
            //        // - if on the other hand a resource was not found (404 Not found) then assume it is an Angular url so ..
            //        // .. reset the path and call await next(); to make the request INCOMING again ..
            //        // .. the request will now be passed to DefaultFiles and then to StaticFiles serving index.html
            //        // .. after StaticFiles the request will turn to OUTGOING eventually coming back here this time with 200 Ok. 

            //        var refreshBaseUrl = "/";
            //        context.Request.Path = new PathString(refreshBaseUrl);
            //        await next();
            //    }
            //});
            //Load Angular index-cli.html directly.
            //Also need to add index.html into Project Perperties > debug lauching profile > Url
            app.Use(async (context, next) =>
            {
                //index.html is set in Project Properties > Debug > Launch Profile > URL field.
                if (context.Request.Path.Value == "/index.html")
                {
                    context.Request.Path = new PathString("/angular-dist/app/browser/index-cli.html");
                }

                await next(); // then hit by the INCOMING request do nothing but pass the request to the next middleware (DefaultFiles)
            });

            //app.UseHttpsRedirection();
            app.UseStatusCodePages();          
            app.UseStaticFiles(); // For the wwwroot folder.

            ////Set angular-content folder as static accessble.
            //app.UseFileServer(new FileServerOptions
            //{
            //    FileProvider = new PhysicalFileProvider(
            //        Path.Combine(env.ContentRootPath, "angular-content")),
            //    RequestPath = "/angular-content"
            //    //EnableDirectoryBrowsing = true
            //});

            app.UseCookiePolicy();
            app.UseCors("AllowAllOrigins");

            app.UseRouting();
            
            //app.UseEndpoints(endpoints => endpoints.MapControllers());
            app.UseEndpoints(endpoints =>
            {
                ////Load server MVC controller initially.
                //endpoints.MapControllerRoute(
                //    name: "default",
                //    pattern: "{controller=Home}/{action=Index}/{id?}");

                //Load Angular index-cli.html directly.
                endpoints.MapControllers();
                var fallbackPath = "/angular-dist/app/browser/index-cli.html";
                endpoints.MapFallbackToFile(fallbackPath);
            });
        }
    }
}
