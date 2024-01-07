using API.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize] 
    public class CartController : ControllerBase
    {
        private readonly CartRepository _cartRepository;

        public CartController(CartRepository cartRepository)
        {
            _cartRepository = cartRepository;
        }

     
        private Guid GetUserIdFromToken()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            return Guid.Parse(userId);
        }

        
        [HttpPost("add")]
        public async Task<IActionResult> AddItemToCart(Guid productId, int quantity)
        {
            var userId = GetUserIdFromToken();
            await _cartRepository.AddItemToCartAsync(userId, productId, quantity);
            return Ok();
        }

      
        [HttpPost("remove")]
        public async Task<IActionResult> RemoveItemFromCart(Guid productId)
        {
            var userId = GetUserIdFromToken();
            await _cartRepository.RemoveItemFromCartAsync(userId, productId);
            return Ok();
        }

       
        [HttpGet]
        public async Task<IActionResult> GetCart()
        {
            var userId = GetUserIdFromToken();
            var cart = await _cartRepository.GetCartAsync(userId);
            return Ok(cart);
        }

     
        [HttpPost("clear")]
        public async Task<IActionResult> ClearCart()
        {
            var userId = GetUserIdFromToken();
            await _cartRepository.ClearCartAsync(userId);
            return Ok();
        }
    }
}
