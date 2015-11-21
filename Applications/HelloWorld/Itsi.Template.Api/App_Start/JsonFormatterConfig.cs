using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net.Http.Formatting;
using System.Web;
using System.Web.Http;

namespace Itsi.Template.Api.App_Start
{
    /// <summary>
    /// Converts the response to camelCasing and the date to isodate format
    /// </summary>
    public class JsonFormatterConfig
    {
        public static void Register()
        {
            var formatter = GlobalConfiguration.Configuration.Formatters.OfType<JsonMediaTypeFormatter>().Single();
            GlobalConfiguration.Configuration.Formatters.Remove(formatter);

            formatter = new JsonMediaTypeFormatter
            {
                SerializerSettings =
            {
                ContractResolver = new CamelCasePropertyNamesContractResolver(),
                DateFormatHandling = Newtonsoft.Json.DateFormatHandling.IsoDateFormat,
                ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
            }
            };

            // Convert all DateTime and DateTimeOffsets to UTC
            formatter.SerializerSettings.Converters.Add(new IsoDateTimeConverter
            {
                DateTimeFormat = "yyyy-MM-ddTHH:mm:ssZ",
                DateTimeStyles = DateTimeStyles.AdjustToUniversal
            });
            GlobalConfiguration.Configuration.Formatters.Insert(0, formatter);
        }
    }
}