using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace Authorization_Microservice.Models
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [JsonIgnore]
        public string Id { get; set; } = String.Empty;
        [Required]
        [BsonElement("name")]
        public string Name { get; set; } = String.Empty;
        [Required]
        [BsonElement("email")]
        public string Email { get; set; } = String.Empty;
        [Required]
        [BsonElement("phone")]
        [StringLength(10)]
        public string Phone { get; set; } = String.Empty;
        [Required]
        [BsonElement("dateOfBirth")]
        public string DOB { get; set; } = String.Empty;
        [Required]
        [BsonElement("password")]
        public string Password { get; set; } = String.Empty;
        [Required]
        [BsonElement("gender")]
        public string Gender { get; set; } = String.Empty;
        [BsonElement("isAdmin")]
        [JsonIgnore]
        public bool IsAdmin { get; set; } = false;
    }
}
