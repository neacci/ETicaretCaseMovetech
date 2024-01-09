using API.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.IdentityModel.Tokens.Jwt;
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

        private Guid GetUserId()
        {
            var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
            if (userIdClaim != null && Guid.TryParse(userIdClaim.Value, out Guid userId))
            {
                return userId;
            }

            throw new InvalidOperationException("User ID not found or invalid.");
        }



        [HttpPost("add")]
        public async Task<IActionResult> AddItemToCart([FromBody] AddItemToCartRequest addItemRequest)
        {
            var userId = GetUserId();
            await _cartRepository.AddItemToCartAsync(userId, addItemRequest.ProductId, addItemRequest.Quantity);
            return Ok();
        }


        [HttpPost("remove")]
        public async Task<IActionResult> RemoveItemFromCart([FromBody]RemoveItemRequest product)
        {
            var userId = GetUserId();
            await _cartRepository.RemoveItemFromCartAsync(userId, product.ProductId);
            return Ok();
        }

       
        [HttpGet]
        public async Task<IActionResult> GetCart()
        {
            var userId = GetUserId();
            var cart = await _cartRepository.GetCartAsync(userId);
            return Ok(cart);
        }

     
        [HttpPost("clear")]
        public async Task<IActionResult> ClearCart()
        {
            var userId = GetUserId();
            await _cartRepository.ClearCartAsync(userId);
            return Ok();
        }

        [HttpPost("update")]
        public async Task<IActionResult> UpdateItemInCart([FromBody] UpdateCartRequest updateRequest)
        {
            var userId = GetUserId();
            if (updateRequest.Quantity > 0)
            {
                await _cartRepository.UpdateItemInCartAsync(userId, updateRequest.ProductId, updateRequest.Quantity);
            }
            else
            {
                await _cartRepository.RemoveItemFromCartAsync(userId, updateRequest.ProductId);
            }
            return Ok();
        }

    }

    public class AddItemToCartRequest
    {
        public Guid ProductId { get; set; }
        public int Quantity { get; set; }
    }

    public class UpdateCartRequest
    {
        public Guid ProductId { get; set; }
        public int Quantity { get; set; }
    }
    public class RemoveItemRequest
    {
        public Guid ProductId { get; set; }
    }
}
