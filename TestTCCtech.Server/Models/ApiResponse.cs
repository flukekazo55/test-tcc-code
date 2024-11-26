namespace TestTCCtech.Server.Models
{
    public class ApiResponse<T>
    {
        public int Status { get; set; } 
        public T Result { get; set; }
    }
}
