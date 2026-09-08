package com.academic.lostandfound.application.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.academic.lostandfound.domain.model.Item;
import com.academic.lostandfound.domain.repository.ItemRepository;

@Service
public class ItemService {
    
    @Autowired
    private ItemRepository itemRepository;
    
}
