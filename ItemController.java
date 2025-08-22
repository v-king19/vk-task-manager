package com.vking.tasks;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/api/items")
@CrossOrigin(origins = "http://localhost:4200")
public class ItemController {
  private final ItemService service;
  public ItemController(ItemService service) { this.service = service; }
  @GetMapping
  public List<Item> all() { return service.all(); }
  @GetMapping("/{id}")
  public Item one(@PathVariable Long id) { return service.one(id); }
  @PostMapping
  public Item create(@RequestBody Item i) { return service.create(i); }
  @PutMapping("/{id}")
  public Item update(@PathVariable Long id, @RequestBody Item i) { return service.update(id, i); }
  @DeleteMapping("/{id}")
  public void delete(@PathVariable Long id) { service.delete(id); }
}
