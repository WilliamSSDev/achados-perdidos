package com.academic.lostandfound.presentation.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.academic.lostandfound.application.service.ItemService;
import com.academic.lostandfound.domain.model.Item;

@RestController 
@RequestMapping("/api/health")
public class TestController {

    private final ItemService itemService;

    public TestController(ItemService itemService) {
        this.itemService = itemService;
    }

    @GetMapping 
    public Map<String, String> status(){
        return Map.of(
            "status", "ok", 
            "mensagem", "API de Achados e Perdidos rodando com sucesso!");
    }

    @GetMapping ("/items")
    public Map<String, Object> getAllItems() {

        var items = itemService.getAllItems();

        if (items.isEmpty()) {
            return Map.of(
                "status", "ok", 
                "mensagem", "Nenhum item encontrado!");
        }

        return Map.of(
            "status", "ok", 
            "mensagem", "Itens recuperados com sucesso!",
            "itens", items);
    }

    @PostMapping("/create-item")
    public Map<String, String> createItem(@RequestBody Item item) {

        try {
            itemService.createItem(item.getTitle(), item.getDescription());
        } catch (Exception e) {
            return Map.of(
                "status", "error", 
                "mensagem", "Erro ao criar item: %s".formatted(e.getMessage()));
        }
        // itemService.createItem(item.getTitle(), item.getDescription());

        return Map.of(
            "status", "ok", 
            "mensagem", "Item criado com sucesso! %s".formatted(item.getTitle()));
    }

    @DeleteMapping("/delete-item/{id}")
    public Map<String, String> deleteItem(@PathVariable Long id) {

        try {
            if (!itemService.deleteItem(id)) {
                return Map.of(
                    "status", "error", 
                    "mensagem", "Item não encontrado: %s".formatted(id));
            }
        } catch (Exception e) {
            return Map.of(
                "status", "error", 
                "mensagem", "Erro ao deletar item: %s".formatted(e.getMessage()));
        }

        return Map.of(
            "status", "ok", 
            "mensagem", "Item deletado com sucesso! %s".formatted(id));
    }

}
