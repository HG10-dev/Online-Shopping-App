namespace Authorization_Microservice.Models
{
    public interface IUserDatabaseSettings
    {
        public string UserCollectionName { get; set; }
        public string ConnectionString  { get; set;}
        public string DatabaseName { get; set; }
    }
}
