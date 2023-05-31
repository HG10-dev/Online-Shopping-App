using Authorization_Microservice.Controllers;
using Authorization_Microservice.Models;
using Authorization_Microservice.Repositories;
using Authorization_Microservice.Services;
using Microsoft.AspNetCore.Mvc;
using Moq;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace Authorization_Microservices_UnitTests
{
    internal class AuthenticateControllerTest
    {
        private AuthCredentials? cred;

        [SetUp]
        public void Setup()
        {
            cred = new AuthCredentials() { Id = "id", Name = "name", Username = "username", Password = "pas", IsAdmin = true };
        }
        [Test]
        public async Task LoginReturnsBadRequest()
        {
            cred = null;
            Mock<IAuthRepo> mockRepo = new Mock<IAuthRepo>();
            //mockRepo.Setup(r => r.GenerateJWT(cred)).Returns("token");
            Mock<IAuthService> mockService = new Mock<IAuthService>();
            //mockService.Setup(s => s.GetAuthCredentialsAsync(It.IsAny<string>(),It.IsAny<string>())).ReturnsAsync(cred);
            AuthenticateController controller = new AuthenticateController(mockRepo.Object, mockService.Object);
            var output = await controller.Login(cred);
            ObjectResult? result = output as ObjectResult;
            Assert.That(result.StatusCode, Is.EqualTo(400));
        }

        [Test]
        public async Task LoginReturnsUnauthorized()
        {
            //AuthCredentials cred = new AuthCredentials() { Id = "id", Name = "name", Username = "username", Password = "pas", IsAdmin = true };
            Mock<IAuthRepo> mockRepo = new Mock<IAuthRepo>();
            mockRepo.Setup(r => r.GenerateJWT(cred)).Returns("token");
            Mock<IAuthService> mockService = new Mock<IAuthService>();
            AuthCredentials? temp=null;
            mockService.Setup(s => s.GetAuthCredentialsAsync(It.IsAny<string>(), It.IsAny<string>())).ReturnsAsync(value: null);
            AuthenticateController controller = new AuthenticateController(mockRepo.Object, mockService.Object);
            var output = await controller.Login(cred);
            UnauthorizedResult? result = output as UnauthorizedResult;
            Assert.That(result.StatusCode, Is.EqualTo(401));
        }

        [Test]
        public async Task LoginSuccessfull()
        {
            //AuthCredentials cred = new AuthCredentials(){Id="id",Name="name", Username="username", Password="pas", IsAdmin=true};
            Mock<IAuthRepo> mockRepo = new Mock<IAuthRepo>();
            mockRepo.Setup(r => r.GenerateJWT(cred)).Returns("token");
            Mock<IAuthService> mockService = new Mock<IAuthService>();
            mockService.Setup(s => s.GetAuthCredentialsAsync(It.IsAny<string>(),It.IsAny<string>())).ReturnsAsync(cred as AuthCredentials);
            AuthenticateController controller = new AuthenticateController(mockRepo.Object, mockService.Object);
            var output = await controller.Login(cred); 
            OkObjectResult? result = output as OkObjectResult;
            Assert.That(result.StatusCode, Is.EqualTo(200));
        }

        [Test]
        public async Task LoginFailstoGenerateJwtAndReturnsServerError()
        {
            Mock<IAuthRepo> mockRepo = new Mock<IAuthRepo>();
            mockRepo.Setup(r => r.GenerateJWT(cred)).Throws(new Exception("Something went wrong"));
            Mock<IAuthService> mockService = new Mock<IAuthService>();
            mockService.Setup(s => s.GetAuthCredentialsAsync(It.IsAny<string>(), It.IsAny<string>())).ReturnsAsync(cred);
            AuthenticateController controller = new AuthenticateController(mockRepo.Object, mockService.Object);
            var output = await controller.Login(cred); 
            ObjectResult? result = output as ObjectResult;
            Assert.That(result.StatusCode, Is.EqualTo(500));
        }

        [TearDown]
        public void TestTeardown()
        {
            cred = null;
        }
    }
}
