using ManageProduct_Microservice.Controllers;
using ManageProduct_Microservice.Models;
using ManageProduct_Microservice.Services;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace ManageProduct_Microservice_UnitTest
{
    public class Tests
    {
        private ProductsController? controller;
        private List<Product>? items;
        Product? p;
        [SetUp]
        public void Setup()
        {
            items = new List<Product>();
        }

        [Test]
        public async Task GetReturnsItems()
        {
            Mock<IProductService> mockService = new Mock<IProductService> ();
            mockService.Setup(s => s.GetAsync()).ReturnsAsync (items);
            controller = new ProductsController (mockService.Object);
            var output = await controller.Get();
            ObjectResult result = output as ObjectResult;
            Assert.That(result.StatusCode, Is.EqualTo(200));
        }

        [Test]
        public async Task GetReturnsInternalError()
        {
            Mock<IProductService> mockService = new Mock<IProductService>();
            mockService.Setup(s => s.GetAsync()).ThrowsAsync(new Exception());
            controller = new ProductsController(mockService.Object);
            var output = await controller.Get();
            ObjectResult result = output as ObjectResult;
            Assert.That(result.StatusCode, Is.EqualTo(500));
        }

        [Test]
        public async Task GetByNameReturnsItem()
        {
            Mock<IProductService> mockService = new Mock<IProductService>();
            mockService.Setup(s => s.GetByNameAsync(It.IsAny<string>())).ReturnsAsync(new Product());
            controller = new ProductsController(mockService.Object);
            var output = await controller.Get("Name");
            ObjectResult result = output as ObjectResult;
            Assert.That(result.StatusCode, Is.EqualTo(200));
        }

        [Test]
        public async Task GetByIdReturnsNotFound()
        {
            Mock<IProductService> mockService = new Mock<IProductService>();
            mockService.Setup(s => s.GetByNameAsync(It.IsAny<string>())).ReturnsAsync(value: null);
            controller = new ProductsController(mockService.Object);
            var output = await controller.Get("Id");
            NotFoundResult result = output as NotFoundResult;
            Assert.That(result.StatusCode, Is.EqualTo(404));
        }

        [Test]
        public async Task GetByIdReturnsBadRequest()
        {
            Mock<IProductService> mockService = new Mock<IProductService>();
            mockService.Setup(s => s.GetByNameAsync(It.IsAny<string>())).ReturnsAsync(items.FirstOrDefault());
            controller = new ProductsController(mockService.Object);
            var output = await controller.Get(null);
            BadRequestResult result = output as BadRequestResult;
            Assert.That(result.StatusCode, Is.EqualTo(400));
        }

        [Test]
        public async Task GetByIdReturnsInternalEror()
        {
            Mock<IProductService> mockService = new Mock<IProductService>();
            mockService.Setup(s => s.GetByNameAsync(It.IsAny<string>())).ThrowsAsync(new Exception());
            controller = new ProductsController(mockService.Object);
            var output = await controller.Get("Id");
            ObjectResult result = output as ObjectResult;
            Assert.That(result.StatusCode, Is.EqualTo(500));
        }

        [Test]
        public async Task PostReturnsBadRequest()
        {
            p = null;
            Mock<IProductService> mockService = new Mock<IProductService>();
            controller = new ProductsController(mockService.Object);
            var output = await controller.Post(p);
            BadRequestResult result = output as BadRequestResult;
            Assert.That(result.StatusCode, Is.EqualTo(400));
        }

        [Test]
        public async Task PostBadRequestForExistingProduct()
        {
            Mock<IProductService> mockService = new Mock<IProductService>();
            mockService.Setup(s => s.GetByNameAsync(It.IsAny<string>())).ReturnsAsync(new Product());
            mockService.Setup(s => s.CreateAsync(It.IsAny<Product>())).Verifiable();
            controller = new ProductsController(mockService.Object);
            var output = await controller.Post(new Product());
            ObjectResult result = output as ObjectResult;
            Assert.That(result.StatusCode, Is.EqualTo(400));
        }

        [Test]
        public async Task PostCreatesItemRecord()
        {
            p = null;
            Mock<IProductService> mockService = new Mock<IProductService>();
            mockService.Setup(s => s.GetByNameAsync(It.IsAny<string>())).ReturnsAsync(p);
            mockService.Setup(s => s.CreateAsync(It.IsAny<Product>())).Verifiable();
            controller = new ProductsController(mockService.Object);
            var output = await controller.Post(new Product());
            ObjectResult result = output as ObjectResult;
            Assert.That(result.StatusCode, Is.EqualTo(201));
        }

        [Test]
        public async Task PostReturnsInternalError()
        {
            p = null;
            Mock<IProductService> mockService = new Mock<IProductService>();
            mockService.Setup(s => s.GetByNameAsync(It.IsAny<string>())).ReturnsAsync(p);
            mockService.Setup(s => s.CreateAsync(It.IsAny<Product>())).ThrowsAsync(new Exception());
            controller = new ProductsController(mockService.Object);
            var output = await controller.Post(new Product());
            ObjectResult result = output as ObjectResult;
            Assert.That(result.StatusCode, Is.EqualTo(500));
        }

        [Test]
        public async Task PutReturnsBadRequestForNoId()
        {
            Mock<IProductService> mockService = new Mock<IProductService>();
            controller = new ProductsController(mockService.Object);
            var output = await controller.Put(string.Empty,new Product());
            BadRequestResult result = output as BadRequestResult;
            Assert.That(result.StatusCode, Is.EqualTo(400));
        }

        [Test]
        public async Task PutReturnsBadRequestForNoItem()
        {
            p = null;
            Mock<IProductService> mockService = new Mock<IProductService>();
            controller = new ProductsController(mockService.Object);
            var output = await controller.Put("id", p);
            BadRequestResult result = output as BadRequestResult;
            Assert.That(result.StatusCode, Is.EqualTo(400));
        }

        [Test]
        public async Task PutUpdatesItem()
        {
            Mock<IProductService> mockService = new Mock<IProductService>();
            mockService.Setup(s => s.UpdateAsync(It.IsAny<string>(), It.IsAny<Product>())).Verifiable();
            controller = new ProductsController(mockService.Object);
            var output = await controller.Put("id", new Product());
            NoContentResult result = output as NoContentResult;
            Assert.That(result.StatusCode, Is.EqualTo(204));
        }

        [Test]
        public async Task PutReturnsInternalError()
        {
            Mock<IProductService> mockService = new Mock<IProductService>();
            mockService.Setup(s => s.UpdateAsync(It.IsAny<string>(), It.IsAny<Product>())).ThrowsAsync(new Exception());
            controller = new ProductsController(mockService.Object);
            var output = await controller.Put("id", new Product());
            ObjectResult result = output as ObjectResult;
            Assert.That(result.StatusCode, Is.EqualTo(500));
        }

        [Test]
        public async Task DeleteReturnsBadRequest()
        {
            Mock<IProductService> mockService = new Mock<IProductService>();
            controller = new ProductsController(mockService.Object);
            var output = await controller.Delete(string.Empty);
            BadRequestResult result = output as BadRequestResult;
            Assert.That(result.StatusCode, Is.EqualTo(400));
        }

        [Test]
        public async Task DeleteReturnsNotFound()
        {
            Mock<IProductService> mockService = new Mock<IProductService>();
            mockService.Setup(s => s.GetByNameAsync(It.IsAny<string>())).ReturnsAsync(value: null);
            controller = new ProductsController(mockService.Object);
            var output = await controller.Delete("id");
            NotFoundResult result = output as NotFoundResult;
            Assert.That(result.StatusCode, Is.EqualTo(404));
        }

        [Test]
        public async Task DeleteSuccessful()
        {
            Mock<IProductService> mockService = new Mock<IProductService>();
            mockService.Setup(s => s.GetByNameAsync(It.IsAny<string>())).ReturnsAsync(new Product());
            controller = new ProductsController(mockService.Object);
            var output = await controller.Delete("id");
            NoContentResult result = output as NoContentResult;
            Assert.That(result.StatusCode, Is.EqualTo(204));
        }

        [Test]
        public async Task DeleteReturnsInternalError()
        {
            Mock<IProductService> mockService = new Mock<IProductService>();
            mockService.Setup(s => s.GetByNameAsync(It.IsAny<string>())).ThrowsAsync(new Exception());
            controller = new ProductsController(mockService.Object);
            var output = await controller.Delete("id");
            ObjectResult result = output as ObjectResult;
            Assert.That(result.StatusCode, Is.EqualTo(500));
        }
    }
}