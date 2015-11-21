using System;
using System.Collections.Generic;
using System.Linq;
using Autofac;
using Autofac.Integration.WebApi;
using System.Reflection;
using System.Web.Http;
using Itsi.Template.Data;
using System.Configuration;
using Itsi.Template.Service;
using Itsi.Template.Service.Contracts;

namespace Itsi.Template.Api.App_Start
{
    public class AutofacConfig
    {
        public static void Register()
        {
            // Create the container builder
            var builder = new ContainerBuilder();

            // Register the custom dependencies
            Bootstrap(builder);

            // Register controllers all at once using assembly scanning
            builder.RegisterApiControllers(Assembly.GetExecutingAssembly());

            // Build the container
            var container = builder.Build();

            // Create the dependency resolver
            var resolver = new AutofacWebApiDependencyResolver(container);

            // Configure Webapi with the dependency resolver
            GlobalConfiguration.Configuration.DependencyResolver = resolver;
        }

        private static void Bootstrap(ContainerBuilder builder)
        {
            builder.RegisterType<TemplateContext>()
                .WithParameter("connectionString", ConfigurationManager.ConnectionStrings["Database.Template.ConnectionString"].ConnectionString)
                .InstancePerRequest();
            builder.RegisterType<TechnologyService>().As<ITechnologyService>().InstancePerRequest(); 
        }
    }
}