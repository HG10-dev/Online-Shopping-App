using Authorization_Microservice.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Authorization_Microservice.Repositories
{
    public class AuthRepo : IAuthRepo
    {
        private readonly IConfiguration configuration;

        public AuthRepo(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public string? GenerateJWT(AuthCredentials loginCredentials)
        {
            if(loginCredentials == null) { return null; }
            var authClaim = new List<Claim>
            {
                new Claim(ClaimTypes.Name, loginCredentials.Name),
                new Claim("username", loginCredentials.Username),
                new Claim(ClaimTypes.Role, loginCredentials.IsAdmin?"Admin":"Customer"),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };
            SymmetricSecurityKey securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["Jwt:Key"]));
            SigningCredentials credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            JwtSecurityToken token = new JwtSecurityToken(
                issuer: configuration["Jwt:issuer"],
                audience: configuration["Jwt:issuer"],
                expires: DateTime.UtcNow.AddMinutes(10),
                claims: authClaim,
                signingCredentials: credentials
                );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
