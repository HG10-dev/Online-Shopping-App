using Authorization_Microservice.Models;
using Authorization_Microservice.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Authorization_Microservice.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegistrationController : ControllerBase
    {
        private readonly IUserService userService;

        public RegistrationController(IUserService userService) 
        {
            this.userService = userService;
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] User newUser)
        {
            try
            {
                if (newUser == null)
                {
                    return BadRequest("!Invalid Input");
                }

                if (await userService.IfExistAlready(newUser))
                {
                    return BadRequest(newUser.Email);
                }
                await userService.CreateAsync(newUser);
                return StatusCode(201, "Resource Created");
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }
    }
}
