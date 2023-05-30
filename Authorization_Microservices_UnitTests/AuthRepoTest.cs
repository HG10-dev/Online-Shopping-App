using Authorization_Microservice.Models;
using Authorization_Microservice.Repositories;
using Authorization_Microservice.Services;
//using Castle.Core.Configuration;
using Microsoft.Extensions.Configuration;
using Moq;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Authorization_Microservices_UnitTests
{
    internal class AuthServiceTest
    {
        //private List<AuthCredentials> credentials;

        [SetUp]
        public void Setup()
        {
            //credentials = new List<AuthCredentials>
            //{
            //    new AuthCredentials { Id = "id_01", Username = "admin", Password = "password", IsAdmin = true },
            //    new AuthCredentials { Id = "id_02", Username = "customer", Password = "password", IsAdmin = false }
            //};
        }

        [TestCase("id_01", "admin", "password",true)]
        [TestCase("id_02", "customer", "password",false)]
        public void GenerateJwtReturnsToken(string id, string uname, string pass, bool isadmin)
        {
            AuthCredentials credential = new AuthCredentials
            {
                Id = id,
                Username = uname,
                Password = pass,
                IsAdmin = isadmin
            };
            Mock<IConfiguration> mock = new Mock<IConfiguration>();
            mock.SetupGet(x => x[It.Is<string>(s => s == "Jwt:Key")]).Returns("16bitsecuritykey");
            mock.SetupGet(x => x[It.Is<string>(s => s == "Jwt:Issuer")]).Returns("issuer");

            AuthRepo authRepo = new AuthRepo(mock.Object);
            string? token = authRepo.GenerateJWT(credential);
            Assert.IsNotNull(token);
        }
        
        public void GenerateJwtReturnsNull()
        {
            AuthCredentials credential=null;
            Mock<IConfiguration> mock = new Mock<IConfiguration>();
            mock.SetupGet(x => x[It.Is<string>(s => s == "Jwt:Key")]).Returns("16bitsecuritykey");
            mock.SetupGet(x => x[It.Is<string>(s => s == "Jwt:Issuer")]).Returns("issuer");

            AuthRepo authRepo = new AuthRepo(mock.Object);
            string? token = authRepo.GenerateJWT(credential);
            Assert.IsNull(token);
        }
    }
}
