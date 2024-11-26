using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TestTCCtech.Server.Data;
using TestTCCtech.Server.Models;

using System.Drawing;
using System.Drawing.Imaging;
using ZXing;
using ZXing.Common;

namespace TestTCCtech.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly ApplicationDbContext _applicationContext;

        public ProductsController(ApplicationDbContext context)
        {
            _applicationContext = context;
        }

        [HttpGet]
        public async Task<ActionResult<ApiResponse<IEnumerable<object>>>> GetAllProducts()
        {
            var Products = await _applicationContext.Products.ToListAsync();

            var ProductsWithBarcodes = Products.Select(product => new
            {
                product.ProductId,
                product.ProductCode,
                ProductBarcode = GenerateBarcode39(product.ProductCode)
            });

            return Ok(new ApiResponse<IEnumerable<object>>
            {
                Status = 200,
                Result = ProductsWithBarcodes
            });
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ApiResponse<Product>>> GetProduct(int id)
        {
            var product = await _applicationContext.Products.FindAsync(id);

            if (product == null)
            {
                return NotFound(new ApiResponse<string>
                {
                    Status = 404,
                    Result = "Product not found."
                });
            }

            return Ok(new ApiResponse<Product>
            {
                Status = 200,
                Result = product
            });
        }

        [HttpPost]
        public async Task<ActionResult<ApiResponse<Product>>> CreateProduct(Product product)
        {
            _applicationContext.Products.Add(product);
            await _applicationContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetProduct), new { id = product.ProductId }, new ApiResponse<Product>
            {
                Status = 201,
                Result = product
            });
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<ApiResponse<string>>> DeleteProduct(int id)
        {
            var product = await _applicationContext.Products.FindAsync(id);

            if (product == null)
            {
                return NotFound(new ApiResponse<string>
                {
                    Status = 404,
                    Result = "Product not found."
                });
            }

            _applicationContext.Products.Remove(product);
            await _applicationContext.SaveChangesAsync();

            return Ok(new ApiResponse<string>
            {
                Status = 200,
                Result = "Product deleted successfully."
            });
        }

        // Copy Code From Net to Generate Barcode
        private string GenerateBarcode39(string ProductCode)
        {
            try
            {
                var barcodeWriter = new ZXing.BarcodeWriterPixelData
                {
                    Format = BarcodeFormat.CODE_39, 
                    Options = new EncodingOptions
                    {
                        Height = 100,
                        Width = 300,
                        Margin = 1  
                    }
                };

                var pixelData = barcodeWriter.Write(ProductCode);

                using var bitmap = new Bitmap(pixelData.Width, pixelData.Height, PixelFormat.Format32bppRgb);
                var bitmapData = bitmap.LockBits(
                    new Rectangle(0, 0, pixelData.Width, pixelData.Height),
                    ImageLockMode.WriteOnly,
                    PixelFormat.Format32bppRgb);

                try
                {
                    System.Runtime.InteropServices.Marshal.Copy(pixelData.Pixels, 0, bitmapData.Scan0, pixelData.Pixels.Length);
                }
                finally
                {
                    bitmap.UnlockBits(bitmapData);
                }

                using var memoryStream = new MemoryStream();
                bitmap.Save(memoryStream, ImageFormat.Png);
                var base64String = Convert.ToBase64String(memoryStream.ToArray());

                return base64String;
            }
            catch (Exception ex)
            {
                throw new Exception("Error generating barcode: " + ex.Message);
            }
        }
    }
}
