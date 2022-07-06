using CMS.Data.DbContexts;
using CMS.Data.Repositories;
using CMS.Domain.Handler;
using Identifi.Essentials;
using Identifi.Essentials.Extensions;
using Identifi.Infrastructure;
using Identifi.Infrastructure.Bootstrappers;
using Identifi.Infrastructure.Extensions;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CMS.Host
{
    public class Startup
    {
       // private readonly IConfiguration _configuration;

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            /* Bootstrapper
                 .Instance
                 .WithServiceCollection(services)
                 .BootstrapInfrastructure()
                 .BootstrapEssentials()
                 .Bootstrap();*/

            //enable CORS
            var provider = services.BuildServiceProvider();
            var configuration = provider.GetRequiredService<IConfiguration>();
            services.AddCors(c =>
            {
                //c.AddPolicy("AllowOrigin", options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
                var frontendURL = configuration.GetValue<string>("frontend_url");
                c.AddDefaultPolicy(builder =>
                {
                    builder.WithOrigins(frontendURL).AllowAnyMethod().AllowAnyHeader();
                });
            });

            string connectionStr = Configuration.GetConnectionString("Employee");
            services.AddDbContext<EmployeeDbContext>(options => options.UseSqlServer(connectionStr));
            //var connectionStrings = _configuration.GetSettings<ConnectionStrings>();
            services.AddControllers();
            services.AddTransient<IEmployeeRepository, EmployeeRepository>();
            services.AddTransient<CreateEmployeeHandler, CreateEmployeeHandler>();
            services.AddTransient<DeleteEmployeeHandler, DeleteEmployeeHandler>();
            services.AddTransient<GetEmployeeHandler, GetEmployeeHandler>();
            services.AddTransient<UpdateEmployeeHandler, UpdateEmployeeHandler>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILoggerFactory loggerFactory)
        {
            //enable CORS
            app.UseCors(options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseRouting();

            app.UseAuthorization();

            //app.UseApiConfig(env, loggerFactory);

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            
        }
    }
}
