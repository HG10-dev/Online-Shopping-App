using Authorization_Microservice.Models;
using MongoDB.Driver;

namespace Authorization_Microservice.Services
{
    public class AuthService : IAuthService
    {
        private readonly IMongoCollection<AuthCredentials> _user;

        public AuthService(IUserDatabaseSettings settings, IMongoClient mongoClient) 
        {
            var database = mongoClient.GetDatabase(settings.DatabaseName);
            _user = database.GetCollection<AuthCredentials>(settings.UserCollectionName);
        }
        public async Task<AuthCredentials?> GetAuthCredentialsAsync(string username, string password)
        {
            return await _user.Find(user => 
                user.Username == username && user.Password == password).FirstOrDefaultAsync();
        }
    }
}
