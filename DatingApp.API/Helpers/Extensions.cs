using System;
using Microsoft.AspNetCore.Http;

namespace DatingApp.API.Helpers
{
    public static class Extensions
    {
        public static void addApplicationError(this HttpResponse response, string message){
            response.Headers.Add("Application-Error", message);
            response.Headers.Add("Acces-Control-Expose-Headers", "Application-Error");
            response.Headers.Add("Acces-Control-Allow-Origin", "*");
        }

        public static int CalculateAge(this DateTime theDateTIme){
            var age = DateTime.Today.Year - theDateTIme.Year;
            if(theDateTIme.AddYears(age) > DateTime.Today){
                age--;
            }
            return age;
        }
    }
}