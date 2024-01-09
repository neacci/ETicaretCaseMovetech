using API.Helpers;
using API.Models;
using API.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorizeController : ControllerBase
    {
        private readonly UserRepository _userRepository;
        private readonly JwtTokenGenerator _jwtTokenGenerator;

        public AuthorizeController(UserRepository userRepository, JwtTokenGenerator jwtTokenGenerator)
        {
            _userRepository = userRepository;
            _jwtTokenGenerator = jwtTokenGenerator;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserLoginDto userDto)
        {
            var createdUser = await _userRepository.CreateUserAsync(new User(userDto));
            if (createdUser != null)
            {
                return Ok(createdUser);
            }
            return BadRequest("Kullanıcı oluşturulamadı.");
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginDto userLogin)
        {
            var user = await _userRepository.GetUserAsync(userLogin.Email, userLogin.Password);
            if (user != null)
            {
                var token = _jwtTokenGenerator.GenerateJwtToken(user);
                return Ok(new { Token = token });
            }
            return Unauthorized("Email veya şifre hatalı.");
        }

    }

    public class UserLoginDto
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

}
