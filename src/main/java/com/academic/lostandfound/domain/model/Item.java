package com.academic.lostandfound.domain.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class Item {
    
    private Long id;
    private String title;
    private String description;
    private String status;
    
    public Item(String title, String description) {
        this.title = title;
        this.description = description;
        this.status = "POSTED";
    }
}
