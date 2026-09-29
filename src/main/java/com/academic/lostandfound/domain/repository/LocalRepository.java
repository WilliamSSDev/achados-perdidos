package com.academic.lostandfound.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.academic.lostandfound.domain.model.LocalEntity;

public interface LocalRepository extends JpaRepository<LocalEntity, Long> {

}
