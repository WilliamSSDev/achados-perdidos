package com.academic.lostandfound;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class LostandfoundApplication {

	public static void main(String[] args) {
		SpringApplication.run(LostandfoundApplication.class, args);
		System.out.println("API de Achados e Perdidos rodando com sucesso!");
	}

}
