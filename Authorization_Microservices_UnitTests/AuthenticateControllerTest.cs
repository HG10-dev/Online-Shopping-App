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
using System.Text;
using System.Threading.Tasks;

namespace Authorization_Microservices_UnitTests
{
    internal class AuthenticateControllerTest
    {
        public async Task LoginReturnsBadRequest()
        {
            AuthCredentials? cred = null;
            Mock<IAuthRepo> mockRepo = new Mock<IAuthRepo>();
            //mockRepo.Setup(r => r.GenerateJWT(cred)).Returns("token");
            Mock<IAuthService> mockService = new Mock<IAuthService>();
            //mockService.Setup(s => s.GetAuthCredentialsAsync("name", "pass")).ReturnsAsync(cred);
            AuthenticateController controller = new AuthenticateController(mockRepo.Object, mockService.Object);
            ObjectResult? result = await controller.Login(cred) as ObjectResult;
            Assert.That(result.StatusCode, Is.EqualTo(400));
        }

        public async Task LoginReturnsUnauthorized()
        {
            AuthCredentials cred = new AuthCredentials() { Id = "id", Username = "name", Password = "pas", IsAdmin = true };
            Mock<IAuthRepo> mockRepo = new Mock<IAuthRepo>();
            mockRepo.Setup(r => r.GenerateJWT(cred)).Returns("token");
            Mock<IAuthService> mockService = new Mock<IAuthService>();
            AuthCredentials? temp=null;
            mockService.Setup(s => s.GetAuthCredentialsAsync("name", "pass")).ReturnsAsync(temp);
            AuthenticateController controller = new AuthenticateController(mockRepo.Object, mockService.Object);
            ObjectResult? result = await controller.Login(cred) as ObjectResult;
            Assert.That(result.StatusCode, Is.EqualTo(401));
        }
        public async Task LoginSuccessfull()
        {
            AuthCredentials cred = new AuthCredentials(){Id="id", Username="name", Password="pas", IsAdmin=true};
            Mock<IAuthRepo> mockRepo = new Mock<IAuthRepo>();
            mockRepo.Setup(r => r.GenerateJWT(cred)).Returns("token");
            Mock<IAuthService> mockService = new Mock<IAuthService>();
            mockService.Setup(s => s.GetAuthCredentialsAsync("name", "pass")).ReturnsAsync(cred);
            AuthenticateController controller = new AuthenticateController(mockRepo.Object, mockService.Object);
            ObjectResult? result = await controller.Login(cred) as ObjectResult;
            Assert.That(result.StatusCode, Is.EqualTo(200));
        }

        public async Task LoginFailstoGenerateJwtAndReturnsServerError()
        {
            AuthCredentials cred = new AuthCredentials() { Id = "id", Username = "name", Password = "pas", IsAdmin = true };
            Mock<IAuthRepo> mockRepo = new Mock<IAuthRepo>();
            mockRepo.Setup(r => r.GenerateJWT(cred)).Throws(new Exception("Something went wrong"));
            Mock<IAuthService> mockService = new Mock<IAuthService>();
            mockService.Setup(s => s.GetAuthCredentialsAsync("name", "pass")).ReturnsAsync(cred);
            AuthenticateController controller = new AuthenticateController(mockRepo.Object, mockService.Object);
            ObjectResult? result = await controller.Login(cred) as ObjectResult;
            Assert.That(result.StatusCode, Is.EqualTo(500));
        }
    }
}
