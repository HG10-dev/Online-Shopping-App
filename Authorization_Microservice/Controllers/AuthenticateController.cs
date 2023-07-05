using Authorization_Microservice.Models;
using Authorization_Microservice.Repositories;
using Authorization_Microservice.Services;
using DnsClient;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Authorization_Microservice.Controllers
{
    [EnableCors("myCorsPolicy")]
    [Route("api/[controller]/")]
    [ApiController]
    public class AuthenticateController : ControllerBase
    {
        private readonly IAuthRepo authRepo;
        private readonly IAuthService authService;

        public AuthenticateController(IAuthRepo authRepo, IAuthService authService) 
        {
            this.authRepo = authRepo;
            this.authService = authService;
        }

        [HttpPost]
        public async Task<IActionResult> Login([FromBody] AuthCredentials login)
        {
            if (login == null)
            {
                return BadRequest("!Invalid Credentials.");
            }

            IActionResult response = Unauthorized();

            AuthCredentials? user = await authService.GetAuthCredentialsAsync(login.Username, login.Password);

            if (user != null)
            {
                try
                {
                    string token = authRepo.GenerateJWT(user);
                    var userData = new List<string>
                    {
                        token,
                        user.Name,
                        user.IsAdmin ? "ADMIN" : "CUSTOMER"
                    };
                    return Ok(userData);
                }
                catch (Exception ex)
                {
                    return StatusCode(500, "  My Bad...Sorry:| \n"+ex.Message);
                }
            }
            return response;

        }

        [Authorize(Roles = "Admin")]
        [Route("Post")]

        //For experiment purpose only :)
        public async Task<IActionResult> Post([FromBody] AuthCredentials login)
        {
            try
            {
                AuthCredentials user = await authService.GetAuthCredentialsAsync(login.Username, login.Password);
                return Ok(user);
            }catch(Exception ex) { return  StatusCode(500, ex.Message); }
        }
    }
}
