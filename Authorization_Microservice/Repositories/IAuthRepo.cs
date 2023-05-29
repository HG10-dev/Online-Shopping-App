using Authorization_Microservice.Models;

namespace Authorization_Microservice.Repositories
{
    public interface IAuthRepo
    {
        public string? GenerateJWT(AuthCredentials credentials);
    }
}
