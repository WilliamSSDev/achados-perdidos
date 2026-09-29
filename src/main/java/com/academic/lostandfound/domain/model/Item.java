package com.academic.lostandfound.domain.model;

import java.time.LocalDateTime;

import org.springframework.cglib.core.Local;

import com.academic.lostandfound.application.service.ItemCategory;
import com.academic.lostandfound.domain.user.User;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Entity 
public class Item {
    @Id 
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String description;
    @Enumerated(EnumType.STRING)
    private ItemCategory category;
    @Enumerated(EnumType.STRING)
    private ItemStatus status = ItemStatus.PERDIDO;
    private LocalDateTime registeredAt;
    private String location;
    private String imageUrl;
    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User userId;
    @ManyToOne 
    @JoinColumn (name = "local_id", referencedColumnName = "id")
    private LocalEntity localId;
    
    public Item(String title, String description, ItemCategory category, ItemStatus status, LocalDateTime registeredAt, String location, String imageUrl, User userId, LocalEntity localId) {
        this.title = title;
        this.description = description;
        this.category = category;
        this.status = status;
        this.registeredAt = registeredAt;
        this.location = location;
        this.imageUrl = imageUrl;
        this.userId = userId;
        this.localId = localId;
    }
}
