using API.Models;
using API.Repositories;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalesReportController : ControllerBase
    {
        private readonly SalesReportRepository _salesReportRepository;

        public SalesReportController(SalesReportRepository salesReportRepository)
        {
            _salesReportRepository = salesReportRepository;
        }

        [HttpGet("GetSalesReport")]
        public async Task<IActionResult> GetSalesReport(DateTime startDate, DateTime endDate)
        {
            var salesReport = await _salesReportRepository.GetSalesReportAsync(startDate, endDate);
            return Ok(salesReport);
        }

        [HttpGet("CalculateTotalRevenue")]
        public async Task<IActionResult> CalculateTotalRevenue(DateTime startDate, DateTime endDate)
        {
            var totalRevenue = await _salesReportRepository.CalculateTotalRevenueAsync(startDate, endDate);
            return Ok(totalRevenue);
        }

        [HttpGet("GetSalesByCategory")]
        public async Task<IActionResult> GetSalesByCategory(DateTime startDate, DateTime endDate)
        {
            var salesByCategory = await _salesReportRepository.GetSalesByCategoryAsync(startDate, endDate);
            return Ok(salesByCategory);
        }
    }
}
