using Authorization_Microservice.Models;
using Authorization_Microservice.Services;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Authorization_Microservice.Controllers
{
    [EnableCors("myCorsPolicy")]
    [Route("api/[controller]")]
    [ApiController]
    public class ForgetPassController : ControllerBase
    {
        private readonly IUserService userService;

        public ForgetPassController(IUserService userService)
        {
            this.userService = userService;
        }

        //[HttpGet("{email}")]
        //public IActionResult Get(string email)
        //{
        //    return Ok(email);
        //}

        [HttpGet("{email}")]
        //To Validate Email 
        public async Task<IActionResult> Get(string email)
        {
            try
            {
                if (email == null) { return BadRequest("!Empty usename"); } 
                if (await userService.IfExistAlready(email))
                {
                    return Ok(email);
                }
                else { return NotFound(email); }
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Sorry for the inconvenience :(\n" + ex.Message);
            }
        }

        [HttpGet("{email}/{dob}/{phone}")]
        public async Task<IActionResult> Get(string email, string dob, string phone)
        {
            try
            {
                if (email == null || dob == null || phone == null) { return BadRequest("!Invalidinput."); }
                if (await userService.IfExistAlready(email, dob, phone))
                {
                    return Ok($"Input data for {email} is verified");
                }
                return NotFound("!Check Phone and DOB again");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Sorry for the inconvenience :(\n" + ex.Message);
            }
        }

        [HttpPut]
        public async Task<IActionResult> Put([FromBody] AuthCredentials credentials)
        {
            try
            {
                if (credentials == null) { return BadRequest("null"); }

                User? temp = await userService.IfExistAlready(credentials);
                if (temp == null)
                { return NotFound(credentials.Username); }

                temp.Password = credentials.Password;
                await userService.UpdateAsync(temp);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Sorry for the inconvenience :(\n" + ex.Message);
            }
        }


    }


}
