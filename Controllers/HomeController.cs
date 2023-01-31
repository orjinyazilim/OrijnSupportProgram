using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using OrjinDestek.Data;
using OrjinDestek.Models;

namespace OrjinDestek.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;
    private readonly OrjincrmContext _db;

    public HomeController(ILogger<HomeController> logger , OrjincrmContext db)
    {
        _db = db;
        _logger = logger;
    }

    public IActionResult Index()
    {
        IEnumerable<TbDestek> destekList = _db.TbDesteks.ToList();
        return View(destekList);
    }

    public IActionResult Privacy()
    {
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
    
}