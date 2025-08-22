package com.vking.tasks;
import org.springframework.stereotype.Service;
import java.util.List;
@Service
public class ItemService {
  private final ItemRepository repo;
  public ItemService(ItemRepository repo) { this.repo = repo; }
  public List<Item> all() { return repo.findAll(); }
  public Item one(Long id) { return repo.findById(id).orElseThrow(); }
  public Item create(Item i) { i.setId(null); return repo.save(i); }
  public Item update(Long id, Item i) {
    Item e = one(id);
    e.setTitle(i.getTitle());
    e.setDetails(i.getDetails());
    e.setStatus(i.getStatus());
    return repo.save(e);
  }
  public void delete(Long id) { repo.deleteById(id); }
}
