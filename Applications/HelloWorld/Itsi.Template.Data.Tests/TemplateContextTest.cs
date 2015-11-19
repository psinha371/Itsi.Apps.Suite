using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Itsi.Template.Data;
using System.Data.Entity;
using System.Configuration;

namespace Itsi.Template.Data.Tests
{
    [TestClass]
    public class TemplateContextTest
    {
        [TestMethod]
        public void TestContext()
        {
            using (var db = new TemplateContext(ConfigurationManager.ConnectionStrings["Database.Template.ConnectionString"].ConnectionString))
            {
                db.Technologies.Add(new Technology
                {
                    Name = "Entity Framework",
                    Version = "6.13",
                    Description = "Use this for persistance and creating database using code first only."
                });
                db.SaveChanges();
                Assert.IsTrue(true);
            }
        }
    }
}
