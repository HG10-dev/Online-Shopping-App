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
    internal class RegistrationControllerTest
    {
        private RegistrationController? controller;
        private User? user;
        [SetUp]
        public void Setup(){}
        [Test]
        public async Task PostReturnsBadRequestForNullInput()
        {
            user = null;
            Mock<IUserService> mockService = new Mock<IUserService>();
            controller = new RegistrationController(mockService.Object);
            ObjectResult result = await controller.Post(user) as ObjectResult;
            Assert.That(result.StatusCode, Is.EqualTo(400));
        }

        [Test]
        public async Task PostReturnsBadRequestForOldUser()
        {
            user = new User()
            {
                Id = "id", Name = "name", Email = "email", DOB = "DOB", Gender = "M", IsAdmin = true, Password = "password", Phone = "1234567897" 
            };

            Mock<IUserService> mockService = new Mock<IUserService>();
            mockService.Setup(s => s.IfExistAlready(It.IsAny<User>())).ReturnsAsync(true);
            controller = new RegistrationController(mockService.Object);
            ObjectResult result = await controller.Post(user) as ObjectResult;
            Assert.That(result.StatusCode, Is.EqualTo(400));
        }

        [Test]
        public async Task PostCreatesResource()
        {
            user = new User()
            {
                Id = "id",
                Name = "name",
                Email = "email",
                DOB = "DOB",
                Gender = "M",
                IsAdmin = true,
                Password = "password",
                Phone = "1234567897"
            };

            Mock<IUserService> mockService = new Mock<IUserService>();
            mockService.Setup(s => s.IfExistAlready(It.IsAny<User>())).ReturnsAsync(false);
            mockService.Setup(s => s.CreateAsync(It.IsAny<User>())).ReturnsAsync(user);
            controller = new RegistrationController(mockService.Object);
            var output = await controller.Post(user);
            ObjectResult result = output as ObjectResult;
            Assert.That(result.StatusCode, Is.EqualTo(201));
        }

        [TearDown]
        public void TestTeardown()
        {
            user = null;
            controller = null;
        }
    }
}
