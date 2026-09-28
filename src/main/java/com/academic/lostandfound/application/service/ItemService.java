package com.academic.lostandfound.application.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.academic.lostandfound.domain.model.Item;
import com.academic.lostandfound.domain.model.ItemStatus;
import com.academic.lostandfound.domain.repository.ItemRepository;

@Service
public class ItemService {
    
    @Autowired
    private ItemRepository itemRepository;

    public Item createItem(String title, String description) {
        Item item = new Item(title, description, ItemCategory.OTHERS, ItemStatus.PERDIDO, null, null, null, null, null);
        return itemRepository.save(item);
    }

    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }

    public boolean deleteItem(Long id) {
        if (!itemRepository.existsById(id)) {
            return false;
        }

        itemRepository.deleteById(id);
        return true;
    }
    
}
