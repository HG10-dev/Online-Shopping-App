using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Authorization_Microservice.Models
{
    [BsonIgnoreExtraElements]
    public class AuthCredentials
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
        [JsonIgnore]
        public string Id { get; set; } = String.Empty;

        [BsonElement("name")]
        public string Name { get; set; } = String.Empty;

        [BsonElement("email")]
        [Required]
        public string Username { get; set; } = String.Empty;
       
        [BsonElement("password")]
        [Required]
        public string Password { get; set; } = String.Empty;
        
        [BsonElement("isAdmin")]
        [JsonIgnore]
        //[Required]
        public bool IsAdmin { get; set; } = false;
    }
}
