using Authorization_Microservice.Models;

namespace Authorization_Microservice.Services
{
    public interface IAuthService
    {
        Task<AuthCredentials?> GetAuthCredentialsAsync(string username, string password);
    }
}
