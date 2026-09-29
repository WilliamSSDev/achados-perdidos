package com.academic.lostandfound.application.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.academic.lostandfound.domain.model.Item;
import com.academic.lostandfound.domain.model.ItemStatus;
import com.academic.lostandfound.domain.model.LocalEntity;
import com.academic.lostandfound.domain.repository.ItemRepository;
import com.academic.lostandfound.domain.user.User;

@Service
public class ItemService {
    
    @Autowired
    private ItemRepository itemRepository;

    public Item createItem(String title, String description, ItemCategory category, ItemStatus status, LocalDateTime registeredAt, String location, String imageUrl, User userId, LocalEntity localId) {
        Item item = new Item(title, description, category, status, registeredAt, location, imageUrl, userId, localId);
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
