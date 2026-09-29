package com.academic.lostandfound.presentation.controller;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

/**
 * CreateItemDTO
 */
@Getter 
@Setter 
@AllArgsConstructor 
public class CreateItemDTO {
    private String title;
    private String description;
    private String category;
    private String status;
    private String registeredAt;
    private String location;
    private String imageUrl;
    private Long userId;
    private Long localId;

}
