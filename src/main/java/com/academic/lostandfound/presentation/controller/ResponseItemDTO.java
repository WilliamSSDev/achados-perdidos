package com.academic.lostandfound.presentation.controller;

/**
 * ResponseItemDTO
 */
public record ResponseItemDTO(Long id, String title, String description, String category, String status, String registeredAt, String location, String imageUrl) {


}
