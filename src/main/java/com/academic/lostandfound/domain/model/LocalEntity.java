package com.academic.lostandfound.domain.model;

import com.academic.lostandfound.domain.user.User;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity 
@Getter 
@Setter 
@NoArgsConstructor 
public class LocalEntity {

    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String name;
    @Column (nullable = true)
    private String type;
    @Column (nullable = false)
    private String address;
    @Column (nullable = false)
    private Double latitude;
    @Column (nullable = false)
    private Double longitude;
    @Column (nullable = true)
    private String description;
    @ManyToOne 
    @JoinColumn(name = "user_id")
    private User user;
    

}
