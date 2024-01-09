using API.Models;
using API.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class OrderController : ControllerBase
    {
        private readonly OrderRepository _orderRepository;
        private readonly CartRepository _cartRepository;

        public OrderController(OrderRepository orderRepository, CartRepository cartRepository)
        {
            _orderRepository = orderRepository;
            _cartRepository = cartRepository;
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create()
        {
            var userId = GetUserId();
            var cartItems = await _cartRepository.GetCartItemsAsync(userId);

            var orderItems = cartItems.Select(ci => new OrderItem
            {
                ProductId = ci.ProductId,
                Quantity = ci.Quantity,
                Price = ci.Product.Price
            }).ToList();

            var order = await _orderRepository.CreateOrderAsync(userId, orderItems);

            await _cartRepository.ClearCartAsync(userId);

            return Ok(order);
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
    }

}
