package com.academic.lostandfound.presentation.controller;


import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.academic.lostandfound.application.service.ItemCategory;
import com.academic.lostandfound.application.service.ItemService;
import com.academic.lostandfound.domain.model.Item;
import com.academic.lostandfound.domain.model.ItemStatus;
import com.academic.lostandfound.domain.model.LocalEntity;
import com.academic.lostandfound.domain.repository.LocalRepository;
import com.academic.lostandfound.domain.repository.UserRepository;
import com.academic.lostandfound.domain.user.User;

@RestController
@RequestMapping("/items")
public class ItemController {

    @Autowired 
    private ItemService itemService;

    @Autowired 
    private UserRepository userRepository;

    @Autowired 
    private LocalRepository localRepository;

    @GetMapping 
    public ResponseEntity<List<ResponseItemDTO>> getAllItems() {

        List<Item> items = itemService.getAllItems();

        List<ResponseItemDTO> response = items.stream()
        .map(item -> new ResponseItemDTO(
            item.getId(),
            item.getTitle(),
            item.getDescription(),
            item.getCategory().name(),
            item.getStatus().name(),
            item.getRegisteredAt() != null
                ? item.getRegisteredAt().toString()
                : null,
            item.getLocation(),
            item.getImageUrl()
        ))
        .toList();

        return ResponseEntity.ok(response);

    }
    @PostMapping("/create")
    public ResponseEntity<ResponseItemDTO> createItem(@RequestBody CreateItemDTO item) {

        User user = userRepository.findById(item.getUserId()).orElseThrow(() -> new RuntimeException("Usuário não encontrado"));

        LocalEntity local = localRepository.findById(item.getLocalId()).orElseThrow(() -> new RuntimeException("Local não encontrado"));

        var createdItem = itemService.createItem(
            item.getTitle(),
            item.getDescription(),
            ItemCategory.valueOf(item.getCategory()),
            ItemStatus.valueOf(item.getStatus()),
            item.getRegisteredAt() != null ? LocalDateTime.parse(item.getRegisteredAt()) : null,
            local.getName(),
            item.getImageUrl(),
            user,
            local
        );

        var responseItemDTO = new ResponseItemDTO(
            createdItem.getId(),
            createdItem.getTitle(),
            createdItem.getDescription(),
            createdItem.getCategory().name(),
            createdItem.getStatus().name(),
            createdItem.getRegisteredAt() != null ? createdItem.getRegisteredAt().toString() : null,
            createdItem.getLocation(),
            createdItem.getImageUrl()
        );

        return ResponseEntity.ok().body(responseItemDTO);

    }

}