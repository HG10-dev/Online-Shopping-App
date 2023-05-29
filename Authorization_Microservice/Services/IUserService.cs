using Authorization_Microservice.Models;

namespace Authorization_Microservice.Services
{
    public interface IUserService
    {
        public Task<User> CreateAsync(User user);
        public Task<bool> IfExistAlready(User newUser);
        public Task<bool> IfExistAlready(string email, string dob, string phone);
        public Task<bool> IfExistAlready(string email);
        public Task<User> IfExistAlready(AuthCredentials credentials);
        public Task UpdateAsync(User user);
    }
}
