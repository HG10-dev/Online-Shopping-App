using Authorization_Microservice.Controllers;
using Authorization_Microservice.Models;
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
    internal class ForgetPassControllerTest
    {
        private AuthCredentials? cred;
        private ForgetPassController? controller;


        [SetUp]
        public void Setup()
        {
            cred = new AuthCredentials() { Id = "id", Name = "name", Username = "username", Password = "pas", IsAdmin = true };
        }

        [Test]
        public async Task GetValidatesEmail()
        {
            Mock<IUserService> mockService = new Mock<IUserService>();
            mockService.Setup(s => s.IfExistAlready(It.IsAny<string>())).ReturnsAsync(true);
            controller = new ForgetPassController(mockService.Object);
            var output = await controller.Get("string");
            ObjectResult result = output as ObjectResult;
            Assert.That(result.StatusCode, Is.EqualTo(200));
        }


        [Test]
        public async Task GetInValidatesEmail()
        {
            Mock<IUserService> mockService = new Mock<IUserService>();
            mockService.Setup(s => s.IfExistAlready(It.IsAny<string>())).ReturnsAsync(false);
            controller = new ForgetPassController(mockService.Object);
            var output = await controller.Get("string");
            NotFoundResult result = output as NotFoundResult;
            Assert.That(result.StatusCode, Is.EqualTo(404));
        }

        [Test]
        public async Task GetValidatesInputData()
        {
            Mock<IUserService> mockService = new Mock<IUserService>();
            mockService.Setup(s => s.IfExistAlready(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>())).ReturnsAsync(true);
            controller = new ForgetPassController(mockService.Object);
            var output = await controller.Get("email","Dob","phone");
            ObjectResult result = output as ObjectResult;
            Assert.That(result.StatusCode, Is.EqualTo(200));
        }

        [Test]
        public async Task GetInValidatesInputData()
        {
            Mock<IUserService> mockService = new Mock<IUserService>();
            mockService.Setup(s => s.IfExistAlready(It.IsAny<string>(), It.IsAny<string>(), It.IsAny<string>())).ReturnsAsync(false);
            controller = new ForgetPassController(mockService.Object);
            var output = await controller.Get("email", "Dob", "phone");
            ObjectResult result = output as ObjectResult; 
            Assert.That(result.StatusCode, Is.EqualTo(404));
        }

        [Test]
        public async Task PutReturnsBadRequestForNullInput()
        {
            cred = null;
            Mock<IUserService> mockService = new Mock<IUserService>();
            controller = new ForgetPassController(mockService.Object);
            var output = await controller.Put(cred);
            ObjectResult result = output as ObjectResult;
            Assert.That(result.StatusCode, Is.EqualTo(400));
        }

        [Test]
        public async Task PutReturnsNotFound()
        {
            cred = new AuthCredentials() { Id="id", IsAdmin=true, Password="pass", Username="uname", Name="name"};
            Mock<IUserService> mockService = new Mock<IUserService>();
            mockService.Setup(s => s.IfExistAlready(It.IsAny<AuthCredentials>())).ReturnsAsync(value: null);
            controller = new ForgetPassController(mockService.Object);
            var output = await controller.Put(cred);
            ObjectResult result = output as ObjectResult;
            Assert.That(result.StatusCode, Is.EqualTo(404));
        }

        [Test]
        public async Task PutReturnsSuccesfull()
        {
            cred = new AuthCredentials() { Id = "id", IsAdmin = true, Password = "pass", Username = "uname", Name = "name" };
            Mock<IUserService> mockService = new Mock<IUserService>();
            mockService.Setup(s => s.IfExistAlready(It.IsAny<AuthCredentials>())).ReturnsAsync(new User());
            mockService.Setup(s => s.UpdateAsync(It.IsAny<User>())).Verifiable();
            controller = new ForgetPassController(mockService.Object);
            var output = await controller.Put(cred);
            NoContentResult result = output as NoContentResult;
            Assert.That(result.StatusCode, Is.EqualTo(204));
        }

        [Test]
        public async Task PutReturnsInternalError()
        {
            cred = new AuthCredentials() { Id = "id", IsAdmin = true, Password = "pass", Username = "uname", Name = "name" };
            Mock<IUserService> mockService = new Mock<IUserService>();
            mockService.Setup(s => s.IfExistAlready(It.IsAny<AuthCredentials>())).ReturnsAsync(new User());
            mockService.Setup(s => s.UpdateAsync(It.IsAny<User>())).ThrowsAsync(new Exception());
            controller = new ForgetPassController(mockService.Object);
            var output = await controller.Put(cred);
            ObjectResult result = output as ObjectResult;
            Assert.That(result.StatusCode, Is.EqualTo(500));
        }
        [TearDown]
        public void TestTeardown()
        {
            cred = null;
            controller = null;
        }
    }
}
