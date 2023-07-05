using Authorization_Microservice.Models;
using Authorization_Microservice.Repositories;
using Authorization_Microservice.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;
using System.Text;

var builder = WebApplication.CreateBuilder(args);
var MyCorsPolicy = "myCorsPolicy";

// Add services to the container.

builder.Services.Configure<UserDatabaseSettings>(
    builder.Configuration.GetSection(nameof(UserDatabaseSettings)));

builder.Services.AddSingleton<IUserDatabaseSettings>(sp =>
    sp.GetRequiredService<IOptions<UserDatabaseSettings>>().Value);

builder.Services.AddSingleton<IMongoClient>(s=> 
    new MongoClient(builder.Configuration.GetValue<string>("UserDatabaseSettings:ConnectionString")));

builder.Services.AddScoped<IAuthService, AuthService>();

builder.Services.AddScoped<IAuthRepo, AuthRepo>();

builder.Services.AddScoped<IUserService, UserService>();

builder.Services.AddAuthentication(option =>
{
    option.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    option.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    option.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(option =>
{
    option.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:issuer"],
        ValidAudience = builder.Configuration["Jwt:issuer"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
    };
});

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyCorsPolicy,
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:3000/",
                                              "http://localhost:3001/",
                                              "http://localhost:3002/");
                      });
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(MyCorsPolicy);

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
