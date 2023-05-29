namespace Authorization_Microservice.Models
{
    public class UserDatabaseSettings : IUserDatabaseSettings
    {
        public string UserCollectionName { get; set; } = String.Empty;
        public string ConnectionString { get; set ; } = String.Empty;
        public string DatabaseName { get; set; } = String.Empty;
    }
}
