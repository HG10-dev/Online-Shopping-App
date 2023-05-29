using Authorization_Microservice.Models;
using MongoDB.Driver;

namespace Authorization_Microservice.Services
{
    public class UserService : IUserService
    {
        private readonly IMongoCollection<User> users;
        private User? oldUser;

        public UserService(IUserDatabaseSettings settings, IMongoClient mongoClient) 
        {
            var database = mongoClient.GetDatabase(settings.DatabaseName);
            users = database.GetCollection<User>(settings.UserCollectionName);
        }
        public async Task<User> CreateAsync(User newUser)
        {
            await users.InsertOneAsync(newUser);
            return newUser;
            //Check if we can return null
        }

        public async Task<bool> IfExistAlready(User newUser)
        {
            oldUser = await users.Find(p => p.Email == newUser.Email).FirstOrDefaultAsync();
            return oldUser != null;
        }

        public async Task<bool> IfExistAlready(string email, string dob, string phone)
        {
            oldUser = await users.Find(p => 
                p.Email == email && p.Phone == phone && p.DOB == dob).FirstOrDefaultAsync();
            return oldUser != null;
        }

        public async Task<bool> IfExistAlready(string email)
        {
            oldUser = await users.Find(p => p.Email == email).FirstOrDefaultAsync();
            return oldUser != null;
        }

        public async Task<User> IfExistAlready(AuthCredentials credentials)
        {
            oldUser = await users.Find(p => p.Email == credentials.Username).FirstOrDefaultAsync();
            return oldUser;
        }
        public async Task UpdateAsync(User updatedUser)
        {
            await users.ReplaceOneAsync(obj => obj.Id == updatedUser.Id, updatedUser);
        }
    }
}
